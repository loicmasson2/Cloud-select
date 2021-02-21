from flask import Flask
from flask import make_response
from flask import jsonify
from requests import get
from math import cos, asin, sqrt

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


@app.route("/clouds/<provider_name>/<region>")
def aiven_cloud_instances(provider_name, region):
    result = []
    clouds_json = get(f"{SITE_NAME}/clouds").json()
    for p in clouds_json["clouds"]:
        current_region = p["geo_region"]
        current_name = trim_provider_name(p["cloud_name"])
        if region == current_region and provider_name == current_name:
            result.append(p)

    if len(result) == 0:
        response_message = "Not found provider %s at the region %s" % (
            provider_name,
            region,
        )
        response = make_response(response_message, 404)
        return response
    return jsonify(result)


@app.route("/clouds/closest")
def aiven_closest():
    v = {"geo_latitude": 60.158, "geo_longitude": 24.903}
    clouds_json = get(f"{SITE_NAME}/clouds").json()
    return jsonify(closest(clouds_json["clouds"], v))


@app.route("/<page_name>")
def other_page(page_name):
    response_message = "The page named %s does not exist." % page_name
    response = make_response(response_message, 404)
    return response


@app.after_request
def apply_caching(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def trim_provider_name(provider_name):
    return provider_name.split("-")[0]


def distance(lat1, lon1, lat2, lon2):
    print(lat1)
    print(lon1)
    print(lat2)
    print(lon2)

    p = 0.017453292519943295
    a = (
        0.5
        - cos((lat2 - lat1) * p) / 2
        + cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2
    )
    return 12742 * asin(sqrt(a))


def closest(data, v):
    return min(
        data,
        key=lambda p: distance(
            v["geo_latitude"],
            v["geo_longitude"],
            p["geo_latitude"],
            p["geo_longitude"],
        ),
    )


if __name__ == "__main__":
    app.run(debug=True)