# Typescript Project using Clean Architecture

Tiny project to implement clean architecture concepts using Typescript.
It's related to courses and students, with the persistence being done on DynamoDB.

## Running with Docker

```bash
docker image build --tag juliocesarmidir/students-courses-project:1.0.0 .

docker container run -d -p 4040:4040 \
  --name students-courses-project \
  --restart always \
  juliocesarmidir/students-courses-project:1.0.0

docker container logs -f students-courses-project
```
