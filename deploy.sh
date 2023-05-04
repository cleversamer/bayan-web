echo "Building app..."
# npm run build

echo "Deploying files to server..."
scp -r build/* samer@191.101.229.249:/var/www/191.101.229.249/

echo "Done!"