# echo LOCALTEST=Foo >> examples/basic/.env.local
printenv

# Clear fetch-cache if present to avoid reusing out of date data
rm -rf ./examples/basic/.next/cache/fetch-cache

npm run build:example