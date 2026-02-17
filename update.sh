#!/usr/bin/env bash

CONTAINER_NAME="kanban"
IMAGE_NAME="kyntasks"
MARKDOWN_FILES_MOUNT="/root/.apps/kanban/tasks/"
CONFIG_DIR_MOUNT="/root/.apps/kanban/config/"
PUID=0
GUID=0
KANBAN_TITLE="Hardware Support Tasks"

# Update the local repository
git pull

# Build the Docker image
docker build -t $IMAGE_NAME .

# Kill and remove the existing container if it exists
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker kill $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Deploy the new container
docker run -d \
    --name $CONTAINER_NAME \
    -e PUID=$PUID \
    -e GUID=$GUID \
    -e TITLE="$KANBAN_TITLE" \
    -e LOCAL_IMAGES_CLEANUP_INTERVAL=1440 \
    -p 8080:8080 \
    -v $MARKDOWN_FILES_MOUNT:/tasks \
    -v $CONFIG_DIR_MOUNT:/config \
    --restart unless-stopped \
    $IMAGE_NAME
