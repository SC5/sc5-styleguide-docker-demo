# Base image
FROM sc5io/ubuntu:latest

# Environment variables
EXPOSE 3000
ENV NODE_ENV production
ENV SG_GIT_REPO https://github.com/SC5/sc5-styleguide-docker-demo.git
ENV SG_GIT_BRANCH master
ENV SG_APP_DIR /sc5-styleguide-demo

# Image build steps
WORKDIR $SG_APP_DIR
RUN npm install sc5-styleguide
RUN npm install -g pm2
RUN mkdir logs

# Image entrypoint / start command
CMD run.sh
