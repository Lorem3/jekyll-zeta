
cd _includes/js_source

for f in ./*.js; do
  NAME=$(basename $f)
  echo "\n\n\n/*********** $(basename $f) ***********/\n" > TMP
  terser "$f"      --config-file terser.json >> TMP
  echo "\n" >> TMP
  mv TMP ../$NAME
  
done