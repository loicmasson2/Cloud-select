from flask import Flask
from flask import make_response
from flask import jsonify
from requests import get
import json


app = Flask(__name__)
SITE_NAME = "https://api.aiven.io/v1"


@app.route("/clouds")
def aiven_clouds():
    return jsonify(get(f"{SITE_NAME}/clouds").json())


@app.route("/providers")
def aiven_providers():
    providers = []
    clouds_json = get(f"{SITE_NAME}/clouds").json()
    for p in clouds_json["clouds"]:
        provider_name = trim_provider_name(p["cloud_name"])
        if provider_name not in providers:
            providers.append(provider_name)
    return jsonify(providers)


@app.route("/regions")
def aiven_regions():
    regions = []

    clouds_json = get(f"{SITE_NAME}/clouds").json()
    for p in clouds_json["clouds"]:
        region_name = p["geo_region"]
        if region_name not in regions:
            regions.append(region_name)
    return jsonify(regions)


@app.route("/<page_name>")
def other_page(page_name):
    response_message = "The page named %s does not exist." % page_name
    response = make_response(response_message, 404)
    return response


def trim_provider_name(provider_name):
    return provider_name.split("-")[0]


if __name__ == "__main__":
    app.run(debug=True)