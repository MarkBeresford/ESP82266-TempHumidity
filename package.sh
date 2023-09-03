#!/usr/bin/env bash

JS_BUNDLE_PATH=static/main-bundle.js

echo Generating js bundle
cd static
npm run package
cd -

echo Generating zip
zip -r package.zip \
    application.py \
    aws_controller.py \
    model/ \
    requirements.txt \
    static/styles \
    ${JS_BUNDLE_PATH} \
    templates/

echo Removing js bundle: ${JS_BUNDLE_PATH}
rm ${JS_BUNDLE_PATH}