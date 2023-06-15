fn organize_tic_ids(tic_ids: &[&str]) -> Vec<usize> {
    tic_ids.iter().map(|tic_id| tic_id.len()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_organize_tic_ids() {
        let tic_ids = vec!["TIC-123", "TIC-456", "TIC-789"];
        let expected_lengths = vec![8, 8, 8];

        let result = organize_tic_ids(&tic_ids);

        assert_eq!(result, expected_lengths);
    }
}