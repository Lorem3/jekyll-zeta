
cd _includes/js_source

echo -----------------------
echo "DEBUG:   sh teser.sh 1 "
echo "Release:   sh teser.sh "
echo -----------------------



if [ "$1" = '1' ]; then
echo current DEBUG 

cp *.js ../
exit 0
fi


echo  current  Release 

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