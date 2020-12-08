# Architechture

Frontend: AngularJs
Backend: nodejs + express
DB: MySQL

# Build and run for developement

1. start backend
    - open backend folder
    - npm install && node index.js

2. start frontend
    - switch to frontend folder
    - npm install && ng server

# Build with docker

1. open scripts folder 
2. execute build-docker.sh

# Deploy with docker

1. open scripts/deploy folder
2. update the config.json in `config` sub directory
3. execute deploy.sh script
