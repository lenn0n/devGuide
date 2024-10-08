# 📢 MongoDB Crash Course
MongoDB is a non-relational database management system (DBMS) that stores data in documents instead of tables and rows. It's a popular document database that's known for its flexibility and scalability.


## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
🔗 Download MongoDB Community

      https://www.mongodb.com/try/download/community

🔗 Download MongoDB Shell (MongoSH)

      https://www.mongodb.com/try/download/shell

🪜 Install the MongoDB in your system and you will get **MongoDB Compass**.

🪜 Next, extract the mongo shell you have downloaded from above and add the executable file in your system **environmental variables**. I am using windows so the step in Linux might be different.


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) MongoSH Commands
ℹ️ You can add any collection even if it does not exists.

> 💡 Change current database

      use DB_NAME

> 💡 Show database and collections

      show databases | collections 

> 💡 Insert single document

      db.COLLECTION.insertOne({ })

> 💡 Insert many document

      db.COLLECTION.insertMany([{...}])

> 💡 Limit return objects by passing second argument

      db.COLLECTION.find({ }, { name: 1, value: 1})

> 💡 Count objects

      db.COLLECTION.find({ }).count()
      // Send Maxpage
      db.COLLECTION.find({ }).count() / limit

> 💡 Limit return documents

      db.COLLECTION.find({ }).limit(3)

> 💡 Skip (Pagination)

      const page = 1, limit = 5
      db.COLLECTION.find({}).skip((page - 1) * limit).limit(limit)

> 💡 Sort return documents

      db.COLLECTION.find({ }).sort({ name: 1 or -1 })

> 💡 Simple Operators (gt = greater than, lt = less than, gte = greater than equal)

      db.COLLECTION.find({ rate: { $gt: 4 || $lte: 2 } })

> 💡 OR Operator Complex Queries 

      db.COLLECTION.find({ $or: [{ rate: { $gt: 4 } }, { name: "lennon" }] })

> 💡 In / Not In

      // Simple approach
      db.COLLECTION.find({ rating: { $in: [4, 5, 6] } })
      db.COLLECTION.find({ rating: { $nin: [4 ,5, 6] } })
      
      // More Complex
      db.COLLECTION.find({ $or: [ { rating: { $gte: 5 } }, { rating: { $in: [4, 5, 6] } } ] })
      db.COLLECTION.find({ $or: [ { rating: { $lt: 5 } }, { rating: { $nin: [4, 5, 6] } } ] })

> 💡 Querying Arrays

      // Returns exactly what inside of previews
      db.COLLECTION.find({ previews: ['http://....png'] }) 

      // Returns something that has string of 'http://'
      db.COLLECTION.find({ previews: 'http://' })
      
      // Returns if one mathes in the all operator
      db.COLLECTION.find({ previews: { $all: ['http://....png', 'http://....jpg'] } })

      // Objects
      db.COLLECTION.find( {"previews.url" : "http://....jpg"} )

> 💡 Deleting Documents

      // Delete one document, set the ObjectID.
      db.COLLECTION.previews.deleteOne({ _id: ObjectId("XXXXX") })

      // Delete many documents
      db.COLLECTION.previews.deleteMany({ name: "Javascript" })

> 💡 Updating Document


      // Update single document based on ObjectId.
      db.COLLECTION.updateOne({ _id: ObjectId("XXX")}, { $set: { rating: 2, price: "143" } })

      // Update many document based on ObjectId.
      db.COLLECTION.updateMany({ name: "lennon" }, { $set: { rating: 10, price: "500" } })
      
> 💡 Increment / Decrement

      // Increment by 100 or Decrement by 100
      doc.COLLECTION.updateOne({ _id: ObjectId(XXX)}, {$inc: { price: 100 or -100})

> 💡 Pushing / Pulling Document

      // Removing single item from array
      db.COLLECTION.updateMany({ name: "lennon" }, { $pull: { previews: "http://...jpg" } })
      
      // Adding single item to array
      db.COLLECTION.updateMany({ name: "lennon" }, { $push: { previews: "http://...jpg" } })

      // Adding multiple item to array
      db.COLLECTION.updateOne({ _id: ObjectId(XXX) }, { $push: { previews: { $each: [ { name: "", url: "" } ] } } })


### 🥨 ObjectID
This util is essential for mutating data inside of our collections.

      const { ObjectId } = require('mongodb')

💡 Needed to pass in id params `_id` when deleting a document: 

      ...deleteOne({ _id: ObjectId(req.params.id) });
      ...findOne({ _id: ObjectId(req.params.id) });

💡 Checking of passed ID if valid or not: 

      if (ObjectID.isValid(req.params.id) { ... }


## 🌿 MongoDB Atlas
Mongo Atlas allows us to host our database in the cloud. To get started, first:

### ➡️ Create an account to their official website

      https://www.mongodb.com/cloud/atlas/register

### ➡️ Inside your NodeJS server, install mongodb to interact with your database.

      npm install mongodb

### ➡️ Create a config file inside your project. ( mongodb/db.ts )
Just replace MONGO_DB_URI with your URI provided by atlas.
      
      const { MongoClient, ServerApiVersion } = require('mongodb')
      
      // Init Database URI and other options
      const client = new MongoClient(process.env.MONGO_DB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      
      // Expose for global use (mongoDB)
      var dbConnection: null
      
      // Handle connections
      module.exports = {
        connectToDb: async (dbName = undefined, callback: Function) => {
          return await client.connect()
            .then((client: { db: Function }) => {
              dbConnection = client.db(dbName)
              return callback()
            })
            .catch((err: null) => {
              return callback(err)
            })
        },
        mongoDB: () => dbConnection
      }

### ➡️ Insert this lines of code in your app ( src/app.ts )

      // Mongo DB Initialization
      const { connectToDb } = require("@mongodb")
      
      // Connect to Mongo and start the server
      connectToDb("portfolio", (err: any) => {
        if (!err) {
          // Start server
          app.listen(process.env.SERVER_PORT, () => {
            console.info(`API is now running on port ${process.env.SERVER_PORT}. MongoDB was also initialized.`)
          })
        } else {
          console.error(`An error occured while trying to connect to MongoDB URI. ${process.env.MONGO_DB_URI}`);
        }
      })

### ➡️ Finally, mongoDB is now available. We have imported the mongoDB as global var.

      const { mongoDB } = require("@mongodb")
      
        mongoDB()
          .collection('social_links')
          .find()
          .sort()
          .toArray()
          .then((data: {}) => {
            res.status(200).json(data)
          })
          .catch((err: null) => {
            res.status(500).json({
              message: "An error occured while trying to fulfill your request."
            })
          })


# 📢 Best Practices
➡️ Having those commands wont be enough in the long run. It's good to know there are some practices we can try in order to improve our data retrieving. Are you fetching or overfetching? 
Imagine you have 10,000 users and you have to find a specific order of the user, what would be the most efficient way to do that?


## 💡 Data Modeling for Performance
Careful data modeling is crucial in MongoDB. Unlike traditional relational databases, MongoDB is schema-less, allowing flexibility but requiring thoughtful design. Consider the following tips:

> Embedding

Imagine you’re building an e-commerce application, and you have two entities: User and Order. You can choose to embed the order details within the user document. This approach is suitable when orders are small and directly related to a user.

      {
        "_id": ObjectId("user_id"),
        "name": "John Doe",
        "email": "john@example.com",
        "orders": [
          {
            "orderNumber": "12345",
            "totalAmount": 100.00,
            "items": [
              { "productId": ObjectId("product_id"), "quantity": 2 },
              { "productId": ObjectId("another_product_id"), "quantity": 1 }
            ]
          },
          // Other orders...
        ]
      }

> Referencing

However, if orders are complex with many fields and you want to maintain a separation between users and orders, you can reference orders from the user document.

User Document

      {
        "_id": ObjectId("user_id"),
        "name": "John Doe",
        "email": "john@example.com"
      }

Order Document
      
      {
        "_id": ObjectId("order_id"),
        "userId": ObjectId("user_id"),
        "orderNumber": "12345",
        "totalAmount": 100.00,
        "items": [
          { "productId": ObjectId("product_id"), "quantity": 2 },
          { "productId": ObjectId("another_product_id"), "quantity": 1 }
        ]
      }

## 💡 Indexing Strategies
Imagine you have a collection of Products and you frequently query products based on both their category and price range.

Without an index, querying might be slow as MongoDB would need to scan through the entire collection. However, you can create a compound index on the category and price fields to significantly speed up these queries.

      db.products.createIndex({ category: 1, price: 1 });

With this compound index in place, queries like the following will benefit from it:

      db.products.find({ category: "Electronics", price: { $gte: 100, $lte: 500 } });

⚠❌ Avoid Over-Indexing: Unnecessary indexes consume storage and slow down write operations. 

### 📇 Covering Indexes
Include all necessary fields in an index to prevent the need for additional data fetching. 

With this covering index, the following query can be satisfied using only the index and without needing to access the actual documents:

      db.orders.find({ orderNumber: "12345" }, { _id: 0, orderNumber: 1, totalAmount: 1 });


## 💡 Aggregation Framework

Instead of retrieving all products in that category and performing the calculation in your application code, you can use the aggregation framework to directly compute the average price in the database:

      db.products.aggregate([
        { $match: { category: "Electronics" } }, // Filter products in the desired category
        { $group: { _id: null, avgPrice: { $avg: "$price" } } } // Calculate the average price
      ]);
