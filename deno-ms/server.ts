import { GrpcServer } from "https://deno.land/x/grpc_basic@0.4.6/server.ts";
import { Bitcoin, BtcPaymentRequest, BtcPaymentResponse } from "./payments.d.ts";

const protoPath = new URL("../proto/payments.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const port = 50051;
const server = new GrpcServer();

server.addService<Bitcoin>(protoFile, {
  async SendPayment(request: BtcPaymentRequest): Promise<BtcPaymentResponse> {
    const message = `hello ${request.fromAddr || "stranger"}`;
    return { message } as BtcPaymentResponse;
  }
});

console.log(`Listening on port ${port}`);
for await (const conn of Deno.listen({ port })) {
  server.handle(conn);
}