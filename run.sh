#!/bin/sh

pm2 startOrRestart docker.json
pm2 logs
