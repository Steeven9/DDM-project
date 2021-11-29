[![Logo](webapp/public/img/logo_dark.svg)]()

# DDM-project
DDM project at USI, Lugano

## Authentication

Be sure to set those environment variables:

```
NEO4J_USERNAME
NEO4J_PASSWORD
NEO4J_URL (with the bolt:// prefix)
MONGODB_URI
HTTP_PASSWORD
```

## API

### Neo4j

[GET] `/api/neo4j/all`\
Returns all the nodes and paths between them 

[GET] `/api/neo4j/`\
Query: `query` (String)\
Used for every valid cypher query 

### MongoDB

Everything is stringified in the query parameters since the body was fucky

[GET] `/api/mongo/:collection`\
Query: `q` (Object)\
Gets all documents that match the given filter (default all)

[POST] `/api/mongo/insert/:collection`\
Query: `docs` ([Object])\
Insert the given documents in the DB

[POST] `/api/mongo/update/:collection`\
Query: `filter` (Object), `newValues` (Object)\
Updates the documents that match the given filter with
the given new values

[GET] `/api/mongo/check/:collection/:id`\
Checks the validity of the given certificate ID


## Docker? Docker!

Create a `.env` file with the credentials above, then either use 
`docker-compose up` or build/pull the image and run it:

`docker build ./webapp -t steeven9/ddm-project`\
or\
`docker pull steeven9/ddm-project`

`docker run --name ddm-project --env-file .env steeven9/ddm-project`


## Login

In the frontend, log in by setting your password when prompted, which should
match the value of the env variable `HTTP_PASSWORD` in the backend.
This is a very strong military-grade security mechanism which ensures the
f2p database instance we're running will never be h4xx3d.
