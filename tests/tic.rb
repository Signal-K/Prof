require 'rspec'

def organize_tic_ids(tic_ids)
  tic_ids.map { |tic_id| tic_id.length }
end

RSpec.describe 'Flask Application Tic ID Organization' do
  it 'returns the length of each Tic ID' do
    tic_ids = ['TIC-123', 'TIC-456', 'TIC-789']
    expected_lengths = [8, 8, 8]
    
    result = organize_tic_ids(tic_ids)
    
    expect(result).to eq(expected_lengths)
  end
end