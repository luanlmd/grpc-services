import { GrpcServer } from "https://deno.land/x/grpc_basic@0.4.7/server.ts";
import { PostsService } from "./posts.d.ts";

const protoPath = new URL("../proto/posts.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const posts: Post[] = [];
const somePost = {
  title: "Hello world",
  content: "This is a test post",
  author: "John Doe",
}
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

  async List(request: Empty): Promise<Post[]> {
    return posts;
  },

  async Find(request: FindPostRequest): Promise<Post[]> {
    return posts.find((post) => post.title.contains(request.query));
  }
});

server.addService<PostsService>(protoFile, {});

console.log(`Listening on port ${port}`);
for await (const conn of Deno.listen({ port })) {
  server.handle(conn);
}