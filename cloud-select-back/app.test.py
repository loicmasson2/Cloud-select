import unittest
import json

from app import app


class BasicTestCase(unittest.TestCase):
    def test_clouds(self):
        tester = app.test_client(self)
        response = tester.get("/clouds", content_type="html/text")
        self.assertEqual(response.status_code, 200)
        with open("clouds.json") as json_file:
            actual_json = json.dumps(json.loads(response.data), sort_keys=True)
            expected_json = json.dumps(json.load(json_file), sort_keys=True)
            self.assertEqual(expected_json, actual_json)

    def test_other(self):
        tester = app.test_client(self)
        response = tester.get("a", content_type="html/text")
        self.assertEqual(response.status_code, 404)
        self.assertTrue(b"does not exist" in response.data)


if __name__ == "__main__":
    unittest.main()