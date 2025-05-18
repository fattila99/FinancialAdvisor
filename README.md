# FinancialAdvisor
 
1. build docker image with
sudo docker build -t my_mongo_image .
2. run docker (db)
sudo docker run -p 6000:27017 -it --name my_mongo_container -d my_mongo_image
3. run server with npm run start in server directory
4. run client with npm run start in client directory
5. open browser and go to localhost:4200