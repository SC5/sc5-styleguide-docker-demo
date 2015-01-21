# sc5-styleguide-docker-demo

Docker image base for [sc5-styleguide](https://github.com/SC5/sc5-styleguide) demo site. This docker image is intended to be used as a publicly hosted demo site for the sc5-styleguide, not for the production purposes. All changes are reset every 30 minutes: on the hour and half past the hour (This could be configured in `scripts/crontab.js`).

## Building a Docker image

1. `docker build -t index.sc5.io/styleguidedemo .`
1. `docker push index.sc5.io/styleguidedemo`
1. restart the docker app
