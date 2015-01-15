# Base image
FROM sc5io/ubuntu:latest

# Environment variables
ENV NODE_ENV production
ENV SG_APP_DIR /sc5-styleguide-demo
ENV SG_PORT 3210
EXPOSE 3210

# Image build steps
COPY scripts Gulpfile.js package.json $SG_APP_DIR
WORKDIR $SG_APP_DIR
RUN mkdir logs
RUN npm install -g pm2
RUN npm install
RUN npm install sc5-styleguide
RUN node scripts/copy-files.js

# Image entrypoint / start command
CMD npm start
