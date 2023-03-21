import { getClient } from "https://deno.land/x/grpc_basic@0.4.6/client.ts";
import { PostsService, Empty } from "./posts.d.ts";

const protoPath = new URL("../proto/posts.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const client = getClient<PostsService>({
  port: 50051,
  root: protoFile,
  serviceName: "PostsService",
});

const req = { query : "Hello" } as FindPostRequest;

console.log('asd', await client.Find(req));

client.close();