echo LOCALTEST=Foo >> .env.local
echo
echo "-----"
echo
pwd
cd ../..
pwd
npm run build:example
cd ./examples/basic
pwd
ls -a
cd .next
ls -a
echo
echo "-----"
echo