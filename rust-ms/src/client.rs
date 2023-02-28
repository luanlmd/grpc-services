use payments::bitcoin_client::BitcoinClient;
use payments::BtcPaymentRequest;

pub mod payments {
    tonic::include_proto!("payments");
}

#[tokio::main]

async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = BitcoinClient::connect("http://127.0.0.1:50051").await?;

    let request = tonic::Request::new(BtcPaymentRequest {
        from_addr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa".to_owned(),
        to_addr: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa".to_owned(),
        amount: 10,
    });

    let response = client.send_payment(request).await?;

    println!("RESPONSE={:?}", response);

    Ok(())
}
