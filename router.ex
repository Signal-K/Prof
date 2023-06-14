defmodule MyApp.Router do
  use MyApp.Web, :router

  pipeline :log_requests do
    plug(:put_request_counter)
  end

  defp put_request_counter(conn, _) do
    page_path = conn.request_path
    request_count = get_request_counter(page_path) || 0
    updated_count = request_count + 1
    conn = put_private(conn, :request_counter, Map.put(request_count, page_path, updated_count))
    conn
  end

  defp get_request_counter(page_path) do
    get_private(Map.get(conn.private, :request_counter), page_path)
  end

  scope "/", MyApp do
    pipe_through [:log_requests]

    get "/", PageController, :index
    get "/:path", PageController, :show
  end
end