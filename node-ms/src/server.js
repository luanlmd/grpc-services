const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../proto/payments.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
 })

const definition = grpc.loadPackageDefinition(packageDefinition).payments;
console.log(definition)

const server = new grpc.Server()
server.addService(definition.Bitcoin.service, { SendPayment: (request, response) => { console.log('Got a Request'); response (null, { successful:true, message:'sent :)'}) } });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});

console.log('Listening')