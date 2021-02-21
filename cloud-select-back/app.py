from flask import Flask
from flask import make_response
from requests import get

app = Flask(__name__)
SITE_NAME = "https://api.aiven.io/v1"


@app.route("/clouds")
def aiven_clouds():
    return get(f"{SITE_NAME}/clouds").content


@app.route("/<page_name>")
def other_page(page_name):
    response = make_response("The page named %s does not exist." % page_name, 404)
    return response


if __name__ == "__main__":
    app.run(debug=True)