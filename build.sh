#!/bin/sh

###################################################
# Environment variables
###################################################
echo "After editing this file, don't forget to run dos2unix"
DST=/cygdrive/c/Apache2.2/htdocs
SRC=/cygdrive/c/Users/Kyle/IdeaProjects/Get_Together
APP=Get_Together

FILES="app/Config app/Console app/Controller app/Lib app/Locale app/Model app/Plugin app/Test app/tmp app/Vendor app/View app/webroot/build app/webroot/.htaccess app/webroot/favicon.ico app/webroot/index.html app/webroot/index.php app/.htaccess app/index.php lib index.php .htaccess"

function clean()
{
  echo "Start clean"
  cd $DST
  if [[ -d $APP ]]; then
    rm -rf $APP
    mkdir $APP
  else
    mkdir $APP
  fi
  echo "Done cleaning"
}

function deploy()
{
  echo "Start deploying"
  cd $SRC
  tar czf $DST/$APP/deploy.tgz $FILES
  cd $DST/$APP
  tar zxf deploy.tgz
  rm deploy.tgz
  echo "Done deploying"
}

cd $SRC/app/webroot
echo "Start building"
gulp
echo "Done building"
clean
deploy