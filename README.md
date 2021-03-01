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

## Roadmap

### Front end

- being able to select both a provider and a region as a filter
- get several results from get closest endpoint
- different colors for different provider on the map
- error handling when the api is not returning any results
- error handling when the api is not working
- being able to select several providers or several regions when filtering
- display which filters are currently applied
- no github actions for frontend but would be quite similar to the back end one, for formatting, linting and test
- could be made responsive
- axios interceptors to change from snake case to camelCase
- couldn't manage to test moving from one page to another
- in retrospect I should have done eveyrhing in one page instead of several, much simpler to adapt and add cross filtering
- the context usage I initially planned to store the coordinates that would be stored on the map. But couldn't make it work so I stored the backend query.
- add cypress for End to End
- add react-styleguidist

### Backend

- would add the possibility to return as many as requested for the nearby endpoint
- caching is using flask caching which is caching everything and seem like brute forcing
- I could have split the logic in different files and have the endpoint just do the validation and return the result of a function
- more types

## Attributions

UI selection
https://medium.muz.li/select-page-ui-inspiration-6d162da12982

Lat long python
https://stackoverflow.com/questions/41336756/find-the-closest-latitude-and-longitude/41337005
https://en.wikipedia.org/wiki/Haversine_formula

Python dict
https://stackoverflow.com/questions/10995172/python-check-if-list-of-keys-exist-in-dictionary

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
https://www.robinwieruch.de/react-hooks-fetch-data

React testing
https://stackoverflow.com/questions/51495473/typescript-and-jest-avoiding-type-errors-on-mocked-functions
https://blog.logrocket.com/testing-the-react-router-usehistory-hook-with-react-testing-library/

React Router
https://medium.com/how-to-react/how-to-use-react-router-in-your-react-js-project-7e1d469a9716
https://stackoverflow.com/questions/50155909/how-to-use-context-api-with-react-router-v4

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
