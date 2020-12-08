#!/bin/bash

workDir="$(dirname "$(readlink -f "$0")")"
# the target web port used in the ec2
port=80

docker_image="booklibrary-img"
docker_container="booklibrary"

docker stop $docker_container > /dev/null 2>&1
docker rm $docker_container > /dev/null 2>&1

docker run -d -i -p $port:8080  \
  -e TZ=Asia/Shanghai \
  -v $workDir/config:/app/backend/config  \
  --name $docker_container $docker_image


echo "Done!"
