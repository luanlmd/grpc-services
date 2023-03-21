import { getClient } from "https://deno.land/x/grpc_basic@0.4.7/client.ts";
import { Bitcoin, BtcPaymentRequest } from "./payments.d.ts";

const protoPath = new URL("../proto/payments.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const client = getClient<Bitcoin>({
  port: 50051,
  root: protoFile,
  serviceName: "Bitcoin",
});

const req = {
  fromAddr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  toAddr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  amount: 10
} as BtcPaymentRequest

console.log(await client.SendPayment(req));

client.close();