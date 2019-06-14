# docker exec blogster_mongo sh -c 'exec mongodump --archive' > blogster-mongo-collections.archive
docker exec blogster_mongo sh -c 'exec mongorestore --archive=/data/backup/blogster-mongo-collections.bson'
