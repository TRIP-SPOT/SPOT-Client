mkdir CodePush

# create js source bundle
npx react-native bundle \
--entry-file=./index.js \
--bundle-output=./CodePush/index.android.bundle \
--assets-dest=./CodePush/ \
--dev=false \
--platform=android

# send codepush
# t에 타겟 버전(android build)
appcenter codepush release \
-a rlfehd2013/SPOT \
-c ./CodePush \
-d Production \
-t 1.0.0 \ 
``

rm -rf CodePush