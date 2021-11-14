[![Logo](webapp/public/img/logo_dark.svg)]()

# DDM-project
DDM project at USI, Lugano

## DB connection

Be sure to set those environment variables:

```
NEO4J_USERNAME
NEO4J_PASSWORD
NEO4J_URL (bolt://...)
HTTP_PASSWORD s3cr37_p4ssw0rd
```


## Docker? Docker!

Create a `.env` file with the DB credentials, then build or pull the image and run it:

`docker build ./webapp -t ddm-project` or `docker pull steeven9/ddm-project`

`docker run --name ddm-project --env-file .env ddm-project`

## Login

In the frontend, log-in by setting your password at `/password`, which should
match the value of the env variable `HTTP_PASSWORD` in the backend.
This is a very strong military-grade security mechanism which ensures the
f2p database instace we're running it will never be h4xx3d.
