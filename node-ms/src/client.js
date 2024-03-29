const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const proto = protoLoader.loadSync('../proto/payments.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const package = grpc.loadPackageDefinition(proto).payments;
//console.log(package);

const client = new package.Bitcoin(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);
//console.log(client);

const req = {
  from_addr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  to_addr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  amount: 10
}

client.SendPayment(req, (error, response) => {
  if (error){ throw error }
  console.log('response', response);
});