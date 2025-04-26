
cd _includes/js_source

for f in ./*.js; do
  NAME=$(basename $f)
  echo $NAME
  
  terser "$f"      --config-file terser.json > tmpJsContent
  SHA=`shasum -a 256 tmpJsContent | head -c 10`
  echo "\n\n/*********** $(basename $f) [$SHA]  ***********/\n" > TMP
  cat tmpJsContent >> TMP
  mv TMP ../$NAME
  
  rm tmpJsContent
done