#!/usr/bin/env bash

eval $(docker-machine env maclev)
docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
