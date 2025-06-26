export interface IPostRequest {
    title: string;
    content: string;
    createdAt?: Date;
    author: string;
    files?: File[];
    existingFiles?: string[];
}

export interface IPost {
    title: string;
    content: string;
    createdAt?: Date;
    author: string;
    images?: string[];
    slug: string
}

export interface IPostResponse extends IPost {
    _id: string;
}

export interface PostProps {
    title: string;
    images?: string[];
    createdAt?: Date;
}