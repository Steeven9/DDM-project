# DDM-project
DDM project at USI, Lugano

## Docker? Docker!

Create a `.env` file with the DB credentials, then build or pull the image and run it:

`docker build ./webapp -t ddm-project` or `docker pull steeven9/ddm-project`

`docker run --name ddm-project --env-file .env ddm-project`
