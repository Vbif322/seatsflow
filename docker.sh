docker stop rest_front
docker rm rest_front
docker rmi rest_front
docker build -t rest_front .
docker run --network="host" --name rest_front rest_front

