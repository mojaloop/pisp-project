#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH="${PATH}:${DIR}/../node_modules/.bin"

for i in $(find ${DIR}/../docs -name '*.puml'); do
  echo "found diagram: $i"
  # make the destination directory if not exists
  mkdir -p $(dirname $i | sed 's#docs#docs/out#g')
  puml generate -s $i -o $(echo $i | sed 's/puml/svg/g' | sed 's#docs#docs/out#g') -i $(echo $i | sed -e 's;[^/]*$;;');
done
