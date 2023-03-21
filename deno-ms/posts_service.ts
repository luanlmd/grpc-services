import { GrpcServer } from "https://deno.land/x/grpc_basic@0.4.7/server.ts";
import { CreatePostRequest, Empty, FindPostRequest, Post, PostsService, StatusResponse } from "./posts.d.ts";

const protoPath = new URL("../proto/posts.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const posts: Post[] = [];
const somePost = {
  title: "Hello world",
  content: "This is a test post",
  author: "John Doe",
} as Post;
posts.push(somePost);
const port = 50051;

const server = new GrpcServer();

server.addService<PostsService>(protoFile, {
  async Create(request: CreatePostRequest): Promise<StatusResponse> {
    const post: Post = {
      id: posts.length + 1,
      title: request.title,
      content: request.content,
      author: request.author,
    }

    posts.push(post);
    const response = { success: true, message: "Post created" } as StatusResponse;
    return response;
  },

  async *List(request: Empty): AsyncGenerator<Post> {
    for (const post of posts) {
      yield post;
    }
  },

  async *Find(request: FindPostRequest): AsyncGenerator<Post> {
    // const filteredPosts = posts.find((post) => post?.title?.includes(request.query?? ''));
    // for (const post of filteredPosts) {
    //   yield post;
    // }
    for (const post of posts) {
      yield post;
    }
  }
});

console.log(`Listening on port ${port}`);
for await (const conn of Deno.listen({ port })) {
  server.handle(conn);
}