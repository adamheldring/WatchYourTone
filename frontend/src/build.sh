#!/bin/bash

# remove recursive force
rm -Rf ../backend/public
mv build ../backend/public

echo Hello from build.sh
