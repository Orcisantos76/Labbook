import z from 'zod';
import { UserModel } from '../models/User';

export interface GetUsersInputDTO{
    q: string;
}

export type GetUsersOutputDTO = UserModel[];

export const GetUsersSchema = z.object({
    q: z.string({invalid_type_error: "Deve ser uma string"})
        .min(1, "Deve possuir no mínimo um caracter")
}).transform((data)=>data as GetUsersInputDTO);
