#!/bin/bash
workDir="$(dirname "$(readlink -f "$0")")"/..

# replace ip with the public IP of ec2
ip="3.238.131.94"
port="80"

# build frontend and copy to backend/static
echo "Replace frontend api url and port"
cd $workDir/frontend && sed -i "s/localhost:3000/$ip:$port/g" src/environments/environment.prod.ts

docker_image="booklibrary-img"
docker rm -f $docker_image > /dev/null 2>&1

cd $workDir
docker build -f scripts/docker/Dockerfile -t $docker_image .
echo "Build docker image finished!"
