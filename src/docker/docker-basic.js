1 docker run <image name>
  Reference the Docker client**** Try to create and run a container****Name of image to use for this container
  docker run = docker create + docker start
  docker run shows the output from the container
  docker start -a iiiiiiiiiiiidornnnnnumb
  -a attaches the container to the terminal and print out the output
  
2 docker run <image name> command
last bit **** default command override

3 docker ps
List running containers

4 docker ps --all
All containers that ever ran

5 docker system prune
Will remove all stopped containers, build cache, all networks not used by atleast one container and all dangling images

6 docker logs <container-id>
  Get logs from a container
  * Not rerunning the container, only emitting the outputs that are already been emitted
  
7 docker stop <container-id> (has 10 seconds to shutdown, if it exceeds that time it will automatically default to kill)
  docker kill <container-id>
    To stop a container (which is continuously executing commands)
  a SIGTERM(Signal to terminate) command is sent to the container 
  a SIGKILL(Signal to kill) does not get to do any cleanup work, immediately should be stopped
  
8 docker exec -it <container-id> <command>
  Execute an additional command in a container
  it- allows us to provide input to the container
  eg: docker exec -it 093b6372ff2b redis-cli
      > set myvalue 5
OK
      > get myvalue     
"5"
-it = -i -t

9 Shell within the container
docker exec -it 234343 sh (gives full terminal access)

10 Docker file - Dockerfile
docker build .

11 Tagging
docker build -t stephengrider/redis:latest .

12 Port mapping
docker run -p 8080:8080 imageId
localport:container port

13 WORKDIR /usr/app

14 docker build -f Dockerfile.dev .

15 docker run -v /app/node_modules -v$(pwd):/app <image_id> -> Volume
volumes with no : is a placeholder

16 WSL and Windows Users Must Read Before Next Lecture (lecture no: 69)

1 Docker compose (separate cli gets installed along with Docker)
docker-compose.yml
version: '3'
services:
  redis-server:
    image: 'redis'
  node-app:
    build: .
    ports:
      - "8081:8081"

2 Docker compose commands
docker-compose up - docker run myimage
docker-compose up --build docker build . & docker run myimage
docker-compose up -d -> launch in background
docker-compose down -> stop containers

3 restart: always | on-failure | "no" | unless-stopped

4 docker-compose
should be run in a folder where docker compose yml file exists

5 docker compose can be used even if you have a single container (to simplify typing on the command line)
eg:

version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app

docker-compose up

version: '3'
services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app

docker-compose up --build
For tests

version: '3'
services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
   tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /app/node_modules
      - .:/app
    command: ["npm", "run", "test"]

nginx

Build phase | Run phase

FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

// Hosting some simple nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
