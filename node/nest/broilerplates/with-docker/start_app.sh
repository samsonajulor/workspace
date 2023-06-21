#!/bin/bash

nodenv=$1

if [ "$nodenv" = "development" ]; then
   npm run start:dev
elif [ "$nodenv" = "debug" ]; then
  echo "Starting the app in debug mode..."
  npm run start:debug
elif [ "$nodenv" = "production" ]; then
  npm run launch:prod
fi