import unittest

def organize_tic_ids(tic_ids):
    return [len(tic_id) for tic_id in tic_ids]

class FlaskApplicationTicIdOrganizationTest(unittest.TestCase):
    def test_organize_tic_ids(self):
        tic_ids = ['TIC-123', 'TIC-456', 'TIC-789']
        expected_lengths = [8, 8, 8]

        result = organize_tic_ids(tic_ids)

        self.assertEqual(result, expected_lengths)

if __name__ == '__main__':
    unittest.main()