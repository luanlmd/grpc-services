const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const proto = protoLoader.loadSync('../../proto/posts.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const package = grpc.loadPackageDefinition(proto).payments;
//console.log(package);

const client = new package.PostsService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);
//console.log(client);

const newPost = {
  title: "My first post",
  content: "This is my first post",
  author: "John Doe"
}

client.Create(newPost, (error, response) => {
  if (error){ throw error }
  console.log('response', response);
});

client.List({}, (error, response) => {
  if (error){ throw error }
  console.log('response', response);
});