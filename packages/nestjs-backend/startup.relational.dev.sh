#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
yarn run migration:run
yarn run seed:run:relational
yarn run start:prod
