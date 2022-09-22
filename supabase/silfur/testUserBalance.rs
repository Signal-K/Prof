#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_credit_balance() {
        let mut credits = Credits::new();
        let user_id = "user1".to_string();

        // Add credits to user
        credits.add_credits(&user_id, 10);

        // Check the user's balance
        assert_eq!(credits.get_balance(&user_id), Some(10));
    }

    #[test]
    fn test_credit_transfer() {
        let mut credits = Credits::new();
        // ....
    }
}