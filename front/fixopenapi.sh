#!/bin/bash

java -jar open-api-generator/openapi-generator-cli.jar generate -i ./api-docs/api-docs.json -g typescript -o ./open-api-generator/client

# atualiza nome do pacote
sed -i 's/\"name\": \"\"/\"name\": \"roadmap-client-api\"/g' open-api-generator/client/package.json

# atualiza versão do pacote
sed -i 's/\"version\": \"\"/\"version\": \"1.0.0\"/g' open-api-generator/client/package.json

# define a versão do typescript
sed -i 's/\"typescript\": \"^3.9.3\"/\"typescript\": \"^4.8.4\"/g' open-api-generator/client/package.json

# define o uso no react
sed -i '1s/.*/{\"resolutions\": {\"@types\/react\": \"^18.2.47\"},/g' open-api-generator/client/package.json

# remove info commonjs e exports
# "type": "commonjs",
# "exports": {
#   ".": {
#     "require": "./dist/index.js",
#     "types": "./dist/index.d.js"
#   }
# },
sed -i '18,24d' open-api-generator/client/package.json

cd open-api-generator/client/ && npm install && npm run build

cd ../../

npm add file:open-api-generator/client --save
