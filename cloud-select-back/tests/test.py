import unittest
import json
from app import app, trim_provider_name


class AivenTestCases(unittest.TestCase):
    def test_clouds(self):
        tester = app.test_client(self)
        response = tester.get("/clouds", content_type="application/json")
        self.assertEqual(response.status_code, 200)
        with open("tests/clouds.json") as json_file:
            actual_json = json.dumps(json.loads(response.data), sort_keys=True)
            expected_json = json.dumps(json.load(json_file), sort_keys=True)
            self.assertEqual(expected_json, actual_json)

    def test_providers(self):
        tester = app.test_client(self)
        response = tester.get("/providers", content_type="application/json")
        self.assertEqual(response.status_code, 200)
        with open("tests/providers.json") as json_file:
            actual_json = json.dumps(json.loads(response.data), sort_keys=True)
            expected_json = json.dumps(json.load(json_file), sort_keys=True)
            self.assertEqual(expected_json, actual_json)

    def test_regions(self):
        tester = app.test_client(self)
        response = tester.get("/regions", content_type="application/json")
        self.assertEqual(response.status_code, 200)
        with open("tests/regions.json") as json_file:
            actual_json = json.dumps(json.loads(response.data), sort_keys=True)
            expected_json = json.dumps(json.load(json_file), sort_keys=True)
            self.assertEqual(expected_json, actual_json)

    def test_instances_with_provider_and_region(self):
        tester = app.test_client(self)
        response = tester.get(
            "/clouds/aws/europe", content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        actual_json = json.loads(response.data)
        self.assertEqual(len(actual_json["clouds"]), 6)

    def test_instances_with_provider_and_region_not_found(self):
        tester = app.test_client(self)
        response = tester.get(
            "/clouds/aws/mars", content_type="application/json"
        )
        self.assertEqual(response.status_code, 404)

    def test_instance_with_latitude_and_longitude(self):
        tester = app.test_client(self)
        response = tester.get(
            "/clouds/closest/60/40", content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        actual_json = json.loads(response.data)
        self.assertEqual(len(actual_json["clouds"]), 1)

    def test_instance_with_latitude_and_missing_longitude(self):
        tester = app.test_client(self)
        response = tester.get(
            "/clouds/closest/60", content_type="application/json"
        )
        self.assertEqual(response.status_code, 404)

    def test_instance_with_latitude_and_longitude_wrong_type(self):
        tester = app.test_client(self)
        response = tester.get(
            "/clouds/closest/hello/mars", content_type="application/json"
        )
        self.assertEqual(response.status_code, 500)

    def test_trim_provider_name(self):
        self.assertEqual("aws", trim_provider_name("aws-af-south-1"))

    def test_other(self):
        tester = app.test_client(self)
        response = tester.get("a", content_type="html/text")
        self.assertEqual(response.status_code, 404)
        self.assertTrue(b"does not exist" in response.data)


# test get clouds withotu comparing blindly json


if __name__ == "__main__":
    unittest.main()