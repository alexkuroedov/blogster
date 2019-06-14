# Blogster
Main technology used in this application: node.js express, passport, handlebars, mongodb

## Run application in docker container
Application run on port 5000
```sh
$ docker-compose up
```
## Dump mongodb data
To save the database, run the script mongodb_dump.sh
```sh
$ cd data && mongodb_dump.sh
```
## Restore mongodb data
To restore the database, run mongodb_restore.sh
```sh
$ cd data && mongodb_restore.sh
```
## Redact mongodb data
Mongo Express is used for easy base editing. It is launched on port 8081


