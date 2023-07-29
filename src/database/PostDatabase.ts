import { resourceLimits } from "worker_threads";
import { postsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
    public static POSTS_TABLE = 'posts'

    public async getPost(){
        
        const result: Array<postsDB> =await BaseDatabase
        .connection(PostsDatabase.POSTS_TABLE)
        return result
    }

    public async createPost(newPost: postsDB){
        await BaseDatabase
        .connection(PostsDatabase.POSTS_TABLE)
        .insert(newPost)
        
    }
}