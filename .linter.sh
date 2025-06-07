#!/bin/bash
cd /home/kavia/workspace/code-generation/chatsphere-35436-a7f8d733/chat_sphere_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

