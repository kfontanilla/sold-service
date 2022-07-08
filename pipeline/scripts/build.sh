tsc --build
cp pipeline/config/app/$NODE_ENV.env .env
cp package.json dist/package.json
cd dist && npm install --only=production
cp .env dist/.env