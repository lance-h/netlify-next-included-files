echo LOCALTEST=Foo >> .env.local
cd ../..
npm run build:example
cd ./examples/basic
ls -a