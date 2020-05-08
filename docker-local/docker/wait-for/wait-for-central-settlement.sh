#!/bin/sh

echo "** STARTUP - Checking for Central-Settlement..."

source /opt/wait-for/wait-for.env

sh /opt/wait-for/wait-for-mysql.sh

sh /opt/wait-for/wait-for-kafka.sh

echo "** STARTUP - Central-Settlement successful!"
