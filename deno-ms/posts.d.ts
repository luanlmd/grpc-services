/* this code was generated by automated tool, 
   should not edit by hand */

export interface PostsService {
  Create(request: CreatePostRequest): Promise<StatusResponse>;
  Find(request: FindPostRequest): AsyncGenerator<Post>;
  ListStream(request: Empty): AsyncGenerator<Post>;
  List(request: Empty): Promise<Posts>;
}

export interface Post {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
}

export interface CreatePostRequest {
  title?: string;
  content?: string;
  author?: string;
}

export interface StatusResponse {
  success?: boolean;
  message?: string;
}

export interface Posts {
  posts?: Post[];
}

export interface FindPostRequest {
  query?: string;
}

export interface Empty {

}
