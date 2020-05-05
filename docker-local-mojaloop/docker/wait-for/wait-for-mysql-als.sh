#!/bin/sh

echo "** STARTUP - Checking for DB MYSQL ALS connection..."

source /opt/wait-for/wait-for.env

apk --no-cache add mysql-client


until result=$(mysql -h $WAIT_FOR_DB_HOST_ALS -P $WAIT_FOR_DB_PORT_ALS -u $WAIT_FOR_DB_USER_ALS --password=$WAIT_FOR_DB_PASSWORD_ALS  $WAIT_FOR_DB_DATABASE_ALS -ss -N -e 'select 1;') \
  && eval 'echo is_connected=$result' \
  && if [ -z $result ]; then false; fi && if [ $result -ne 1 ]; then false; fi; do echo waiting for MySQL; sleep 2;
done;

echo "** STARTUP - DB MYSQL ALS  connection successful!"