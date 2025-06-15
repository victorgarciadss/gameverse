export interface IPostRequest {
    title: string;
    content: string;
    createdAt?: Date;
    author: string;
    files?: File[];
}

export interface IPost {
    title: string;
    content: string;
    createdAt?: Date;
    author: string;
    images?: string[];
}