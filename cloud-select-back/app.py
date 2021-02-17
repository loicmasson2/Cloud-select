from flask import Flask
from requests import get
app = Flask(__name__)
SITE_NAME = 'https://api.aiven.io/v1'


@app.route('/clouds')
def aiven_clouds():
    return get(f"{SITE_NAME}/clouds").content
