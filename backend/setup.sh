mongo qkart --eval "db.dropDatabase()" 
mongoimport -d coffee -c datas --file data/export_sample.json