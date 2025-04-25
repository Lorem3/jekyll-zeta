
cd _includes/js_source

for f in ./*.js; do
  echo $f
  terser "$f"    -o "../$(basename "${f%.js}.js")"  --config-file terser.json
done