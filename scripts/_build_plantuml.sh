#!/usr/bin/env bash

for i in $(git diff --name-only `find . -name '*.puml'`); do
  echo "found diagram: $i"
  puml generate -p $i -o $(echo $i | sed 's/puml/png/g' | sed 's#docs#docs/out#g') -i $(echo $i | sed -e 's;[^/]*$;;');
done
