## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) MongoDB Crash Course
MongoDB is a non-relational database management system (DBMS) that stores data in documents instead of tables and rows. It's a popular document database that's known for its flexibility and scalability.


## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
- Download MongoDB Community

      https://www.mongodb.com/try/download/community

- Download MongoDB Shell (MongoSH)

      https://www.mongodb.com/try/download/shell

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Install the MongoDB in your system and you will get **MongoDB Compass**.

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) Next, extract the mongo shell you have downloaded from above and add the executable file in your system **environmental variables**. I am using windows so the step in Linux might be different.


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Common Commands
You can add any collection even if it does not exists.

> Change current database

      use DB_NAME

> Show database and collections

      show databases | collections 

> Insert single document

      db.COLLECTION.insertOne({ })

> Insert many document

      db.COLLECTION.insertMany({ })

> Limit return objects by passing second argument

      db.COLLECTION.find({ }, { name: 1, value: 1})

> Count objects

      db.COLLECTION.find({ }).count()

> Limit return documents

      db.COLLECTION.find({ }).limit(3)

> Sort return documents

      db.COLLECTION.find({ }).sort({ name: 1 or -1 })

> Simple Operators (gt = greater than, lt = less than, gte = greater than equal)

      db.COLLECTION.find({ rate: { $gt: 4 || $lte: 2 } })

> OR Operator Complex Queries 

      db.COLLECTION.find({ $or: [{ rate: { $gt: 4 } }, { name: "lennon" }] })
