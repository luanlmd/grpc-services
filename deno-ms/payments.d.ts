/* this code was generated by automated tool, 
   should not edit by hand */

export interface Bitcoin {
  SendPayment(request: BtcPaymentRequest): Promise<BtcPaymentResponse>;
}

export interface BtcPaymentRequest {
  fromAddr?: string;
  toAddr?: string;
  amount?: number;
}

export interface BtcPaymentResponse {
  successful?: boolean;
  message?: string;
}