use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use warp::{Filter, Rejection, Reply};

#[tokio::main]
async fn main() {
    let counter = Arc::new(Mutex::new(HashMap::<String, u32>::new())); // Create a shared counter to track the number of requests for each page

    let log_filter = warp::path::full() // Create a filter that logs requests and updates the counter
        .and_then(move |path: warp::filters::path::FullPath| {
            let counter = counter.clone();
            async move {
                let page = path.as_str().to_owned();
                let mut counter = counter.lock().unwrap();
                let count = counter.entry(page.clone()).or_insert(0);
                *count += 1;
                Ok::<_, Rejection>(format!("Page: {}\n", page))
            }
        })
        .recover(|_| async { Ok("Error handling request".to_owned()) });

    // Start the warp server
    warp::serve(log_filter).run(([127, 0, 0, 1], 8000)).await;
}