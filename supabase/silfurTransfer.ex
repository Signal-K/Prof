defmodule SilfurTest do
  use ExUnit.Case

  test "silfur balance" do
    silfurs = Silfur.new()
    user_id = "user1"

    # Add credits to the user
    silfurs = silfurs.add_silfurs(user_id, 10)

  end
