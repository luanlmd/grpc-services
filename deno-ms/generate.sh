#/bin/bash

deno run --allow-read https://deno.land/x/grpc_basic@0.4.6/gen/dts.ts ../proto/payments.proto > ./payments.d.ts