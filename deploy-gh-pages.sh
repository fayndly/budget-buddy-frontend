
# !/bin/bash
source ./.env

set -e

npm run build

cd dist

mv index.html 404.html

git init
git add -A
git commit -m 'deploy'

echo $VITE_GITHUB_USERNAME
echo $VITE_REPO_NAME
echo $VITE_DEPLOY_FROM_BRANCH
echo $VITE_DEPLOY_TO_BRANCH

git push -f git@github.com:$VITE_GITHUB_USERNAME/$VITE_REPO_NAME.git $VITE_DEPLOY_FROM_BRANCH:$VITE_DEPLOY_TO_BRANCH

cd -