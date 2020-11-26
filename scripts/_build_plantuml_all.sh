#!/usr/bin/env bash

for i in $(find ./docs -name '*.puml'); do
  echo "found diagram: $i"
  # make the destination directory if not exists
  mkdir -p $(dirname $i | sed 's#docs#docs/out#g')
  puml generate -s $i -o $(echo $i | sed 's/puml/svg/g' | sed 's#docs#docs/out#g') -i $(echo $i | sed -e 's;[^/]*$;;');
done
