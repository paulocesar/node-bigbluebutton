#!/bin/bash

SPECS=`dirname $0`
MOCHA=$SPECS/../node_modules/mocha/bin/mocha
echo Running $SPECS/$1*

$MOCHA --debug-brk --timeout 0 --reporter spec --require should $2 $SPECS/$1* &
MOCHA_PID=$!

node-inspector &
INSPECTOR_PID=$!

wait $MOCHA_PID
kill -9 $INSPECTOR_PID
