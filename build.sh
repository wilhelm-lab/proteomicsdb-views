echo "Replace host with empty string in src/store/store.js"
sed -i 's/host: ".*"/host: ""/g' src/store/store.js
echo "npm run build"
NODE_OPTIONS=--max_old_space_size=8192 npm run build;
cd  ./dist/;
echo "zip -r frontend.zip assets fonts css js img index.html favicon.ico;"
zip -r frontend.zip assets fonts css js img index.html favicon.ico;

