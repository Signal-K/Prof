defmodule TicIdOrganizationTest do
  use ExUnit.Case

  def organize_tic_ids(tic_ids) do
    Enum.map(tic_ids, &String.length/1)
  end

  test "organize_tic_ids/1 returns the length of each Tic ID" do
    tic_ids = ["TIC-123", "TIC-456", "TIC-789"]
    expected_lengths = [8, 8, 8]

    result = organize_tic_ids(tic_ids)

    assert result == expected_lengths
  end
end