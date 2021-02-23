# Cloud-select

Prototype web application for cloud selection

## Exercice

Aiven is a Database As a Service provider. A customer can launch a database in any of the supported clouds (like Google or Amazon cloud) using the Aiven web console.
Your task is to create a prototype web application for improved cloud selection logic. The application should include a frontend and a server implementation. The server should act as an intermediate cache and as a transformation layer on top of public Aiven REST API.
Aiven's clouds can be listed using the API as described here https://api.aiven.io/doc/#tag/Cloud.
It should be possible to select and filter regions by the cloud provider (e.g. Amazon Web Services or Google Cloud Platform) and by distance (shortest distance to the user). The distance comparison should be based on Geolocation. Our API returns latitude and longitude values for each region.

## How to Use

Firstly, download [Docker desktop](https://www.docker.com/products/docker-desktop) and follow its
instructions to install it. This allows us to start using Docker containers.

Create a local copy of this repository and run

    docker-compose build

This spins up Compose and builds a local development environment according to
our specifications in [docker-compose.yml](docker-compose.yml). Keep in mind that
this file contains settings for _development_, and not _production_.

After the containers have been built (this may take a few minutes), run

    docker-compose up

This one command boots up a local server for Flask (on port 5000)
and React (on port 3000). Head over to

    http://localhost:3000/

## Design

See the folder wireframes.

I got inspiration from https://medium.muz.li/select-page-ui-inspiration-6d162da12982.
I used the complementary colors from https://aiven.io/ homepage.

## Attributions

UI selection
https://medium.muz.li/select-page-ui-inspiration-6d162da12982

Lat long python
https://stackoverflow.com/questions/41336756/find-the-closest-latitude-and-longitude/41337005
https://en.wikipedia.org/wiki/Haversine_formula

Tooltip
https://www.w3schools.com/css/css_tooltip.asp

Docker
https://github.com/shoyo/react-flask-docker-boilerplate

Aiven doc
https://api.aiven.io/doc/#tag/Cloud

Flask doc
https://flask.palletsprojects.com/en/1.1.x/
https://dev.to/jcowie/how-to-create-a-flask-proxy-2bpd
https://www.datascienceblog.net/post/programming/flask-api-development/

Flask tests:
https://medium.com/better-programming/build-test-and-deploy-a-mini-flask-application-1d9ca6c45115

React and TS
https://create-react-app.dev/docs/adding-typescript/
https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
https://js.plainenglish.io/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435

Rebass doc
https://rebassjs.org/

Better commits
https://medium.com/swlh/write-better-commits-with-semantic-commits-3316c68763f6

Restful api
https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

Mapbox
https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
https://stackoverflow.com/questions/61312839/reactmapgl-add-points-from-geojson
https://github.com/visgl/react-map-gl/blob/master/docs/api-reference/marker.md
https://www.flaticon.com/free-icon/maps-and-flags_447031?term=marker&page=1&position=2&page=1&position=2&related_id=447031&origin=search

Flask hosting:
https://studygyaan.com/free-hosting/free-hosting-server-for-web-based-projects#python-flask-free-hosting
