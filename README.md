# Typescript Project using Clean Architecture

Tiny project to implement clean architecture concepts using Typescript.
It's related to courses and students, with the persistence being done on DynamoDB.

## Running with Docker

```bash
# with docker-compose
docker-compose up -d --build
docker-compose logs -f --tail 100 students-courses-project

# with docker
docker image build --tag juliocesarmidia/students-courses-project:1.0.0 .

docker container run -d -p 4040:4040 \
  --name students-courses-project \
  --restart always \
  juliocesarmidia/students-courses-project:1.0.0

docker container logs -f --tail 100 students-courses-project
```
