# run this script on a unix-like system

echo "\n> remap"
echo "> .js extensions to .cjs \n"

find dist/cjs -name "*.js" | sed 's/^\(.*\)\.js$/mv "\1.js" "\1.cjs"/' | sh
sed -i '' -rEe 's/\.js\"/\.cjs"/g' $(find ./dist/cjs -type f)

echo "\n> remap"
echo "> .js extensions to .mjs \n"

find dist/mjs -name "*.js" | sed 's/^\(.*\)\.js$/mv "\1.js" "\1.mjs"/' | sh
sed -i '' -rEe "s/\.js'/\.mjs'/g" $(find ./dist/mjs -type f)
