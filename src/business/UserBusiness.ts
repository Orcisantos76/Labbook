
import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/getUser.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dtos";
import { BadRequestError } from "../erros/BadRequestError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const hashedPassword = await this.hashManager.hash(password);

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    const user = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      dateString
    );

    const userDB = user.toDBModel();
    await this.userDatabase.insertUser(userDB);

    const payload: TokenPayload = {
      id: user.getId,
      name: user.getName,
      role: user.getRole,
    };

    const token = this.tokenManager.createToken(payload);

    const output: SignupOutputDTO = {
      token,
    };

    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new BadRequestError("'email' ou 'senha' incorretos!");
    }

    const isPasswordValid = await this.hashManager.compare(
      password,
      userDB.password
    );

    if (!isPasswordValid) {
      throw new BadRequestError("'email' ou 'senha' incorretos!");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload: TokenPayload = {
      id: user.getId,
      name: user.getName,
      role: user.getRole,
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const output: LoginOutputDTO = {
      token,
    };

    return output;
  };

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("'token' inválido!");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("Somente admins podem acessar getUsers!");
    }

    const usersDB = await this.userDatabase.findUsers(q);

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      );

      return user.toBusinessModel();
    });

    const output: GetUsersOutputDTO = users;

    return output;
  };
}
