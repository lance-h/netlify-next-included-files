# echo LOCALTEST=Foo >> .env.local
# echo
# echo "-----"
# echo
# pwd
# cd ../..
# pwd
# # Build basic
# npm run build:example
# cd ./examples/basic
# pwd
# ls -a
# cd .next
# ls -a
# echo
# echo "-----"
# echo

echo LOCALTEST=Foo >> examples/basic/.env.local
npm run build:example