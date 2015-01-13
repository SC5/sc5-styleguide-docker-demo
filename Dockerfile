# Base image
FROM sc5io/ubuntu:latest

# Environment variables
ENV NODE_ENV production
ENV SG_APP_DIR /sc5-styleguide-demo
ENV SG_PORT 3210
EXPOSE 3210

# Image build steps
COPY scripts $SG_APP_DIR/scripts
WORKDIR $SG_APP_DIR
RUN mkdir logs
RUN npm install -g pm2
RUN npm install
RUN npm install sc5-styleguide@0.3.0-rc2

# Image entrypoint / start command
CMD npm start
