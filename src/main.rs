use reqwest::StatusCode;

#[tokio::main]
async fn main() {
    let urls = vec![
        "https://play.skinetics.tech/",
        "https://play.skinetics.tech/tests/planets",
        "https://play.skinetics.tech/tests/planets/51",
        "https://play.skinetics.tech/tests/onboarding",
        "http://localhost:3000/",
        "http://localhost:3000/tests/planets",
        "http://localhost:3000/tests/planets/51",
        "http://localhost:3000/tests/onboarding",
    ];

    for url in urls {
        match test_url(url).await {
            Ok(status) => {
                println!("URL: {} - Status Code: {}", url, status);
                if status.is_success() {
                    println!("Page loaded successfully!");
                } else {
                    println!("Failed to load the page.");
                }
            }
            Err(err) => {
                println!("Error testing URL {}: {}", url, err);
            }
        }
    }
}

async fn test_url(url: &str) -> Result<StatusCode, reqwest::Error> {
    let response = reqwest::get(url).await?;
    Ok(response.status())
}