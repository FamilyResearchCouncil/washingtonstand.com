#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
BRANCH_NAME="$1"
COMPOSE_FILE="$SCRIPT_DIR/docker-compose.$BRANCH_NAME.yml"
STACK="washingtonstand-$BRANCH_NAME"


test -f "$COMPOSE_FILE" && {
    echo "Deploying stack '$STACK' to the swarm"

    docker stack deploy --with-registry-auth -c "$COMPOSE_FILE" "$STACK"

}
