echo LOCALTEST=Foo >> .env.local
pwd
cd ../..
pwd
npm run build:example
cd ./examples/basic
pwd
ls -a