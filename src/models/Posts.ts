


export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    creator_it: string,
    update_at: string,
}

export interface PostModel {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    creator: {
        id: string;
        name: string;
    };
}

export enum POST_LIKE {
    LIKED = "already like",
    DISLIKED = "already dislike",
}

export interface LikeDislikeDB {
    user_id: string;
    post_id: string;
    like: number;
}


export interface PostDBWithCreatorName {
    id: string;
    creator_id: string;
    content: string;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string;
    creator_name: string;
}
export class Posts {
constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorName: string,
) {}

public getId(): string {
    return this.id;
}

public setId(v: string): void {
    this.id = v;
}

public getCreatorId(): string {
    return this.creatorId;
}

public setCreatorId(v: string): void {
    this.creatorId = v;
}

public getContent(): string {
    return this.content;
}

public setContent(v: string): void {
    this.content = v;
}

public getLikes(): number {
    return this.likes;
}

public setLikes(v: number): void {
    this.likes = v;
}

public addLike(): void {
    this.likes += 1;
}

public removeLike(): void {
    this.likes -= 1;
}

public getDislikes(): number {
    return this.dislikes;
}

public setDislikes(v: number): void {
    this.dislikes = v;
}

public getCreatedAt(): string {
    return this.createdAt;
}

public setCreatedAt(v: string): void {
    this.createdAt = v;
}

public getUpdatedAt(): string {
    return this.updatedAt;
}

public setUpdatedAt(v: string): void {
    this.updatedAt = v;
}

public getCreatorName(): string{
    return this.creatorName
}

public setCreatorName(v: string){
    this.creatorName = v
}
}
