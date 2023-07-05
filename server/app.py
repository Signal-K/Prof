from flask import Flask, request

app = Flask(__name__)

# Create a dictionary to track the number of requests for each page
request_counter = {}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def log_requests(path):
    # Update the request count for the current page
    request_counter[path] = request_counter.get(path, 0) + 1
    # Log the page and request count
    print(f"Page: {path}\n")
    return "Request logged successfully"

if __name__ == '__main__':
    app.run()