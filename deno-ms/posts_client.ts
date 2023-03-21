import { getClient } from "https://deno.land/x/grpc_basic@0.4.6/client.ts";
import { PostsService, FindPostRequest, Post } from "./posts.d.ts";

const protoPath = new URL("../proto/posts.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const client = getClient<PostsService>({
  port: 50051,
  root: protoFile,
  serviceName: "PostsService",
});

const newPost = {
  title: "Hey Title",
  content: "I just created this post",
  author: "Johnny Test"
} as Post;
console.log(await client.Create(newPost));

const req = { query : "Hello" } as FindPostRequest;
for await (const reply of client.Find(req)) {
  console.log(reply);
}

client.close();