export enum tipoUsuario{
    Admin = "Admin",
    Normal = "Normal"
}
//Enum limita a tipo normal ou admin

export type UserDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: tipoUsuario,
    created_at: string
}

export interface postsDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    updated_at: string
}