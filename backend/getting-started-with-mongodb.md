# 📢 MongoDB Crash Course
MongoDB is a non-relational database management system (DBMS) that stores data in documents instead of tables and rows. It's a popular document database that's known for its flexibility and scalability.


## ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
🔗 Download MongoDB Community

      https://www.mongodb.com/try/download/community

🔗 Download MongoDB Shell (MongoSH)

      https://www.mongodb.com/try/download/shell

🪜 Install the MongoDB in your system and you will get **MongoDB Compass**.

🪜 Next, extract the mongo shell you have downloaded from above and add the executable file in your system **environmental variables**. I am using windows so the step in Linux might be different.


### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Common Commands
ℹ️ You can add any collection even if it does not exists.

> 💡 Change current database

      use DB_NAME

> 💡 Show database and collections

      show databases | collections 

> 💡 Insert single document

      db.COLLECTION.insertOne({ })

> 💡 Insert many document

      db.COLLECTION.insertMany({ })

> 💡 Limit return objects by passing second argument

      db.COLLECTION.find({ }, { name: 1, value: 1})

> 💡 Count objects

      db.COLLECTION.find({ }).count()

> 💡 Limit return documents

      db.COLLECTION.find({ }).limit(3)

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

> Querying Arrays

      // Returns exactly what inside of previews
      db.COLLECTION.find({ previews: ['http://....png'] }) 

      // Returns something that has string of 'http://'
      db.COLLECTION.find({ previews: 'http://' })
      
      // Returns if one mathes in the all operator
      db.COLLECTION.find({ previews: { $all: ['http://....png', 'http://....jpg'] } })

      // Objects
      db.COLLECTION.find( {"previews.url" : "http://....jpg"} )

> Deleting Documents

      // Delete one document, set the ObjectID.
      db.COLLECTION.previews.deleteOne({ _id: ObjectId("XXXXX") })

      // Delete many documents
      db.COLLECTION.previews.deleteMany({ name: "Javascript" })

> Updating Document


      // Update single document based on ObjectId.
      db.COLLECTION.updateOne({ _id: ObjectId("XXX")}, { $set: { rating: 2, price: "143" } })

      // Update many document based on ObjectId.
      db.COLLECTION.updateMany({ name: "lennon" }, { $set: { rating: 10, price: "500" } })
      
> Increment / Decrement

      // Increment by 100 or Decrement by 100
      doc.COLLECTION.updateOne({ _id: ObjectId(XXX)}, {$inc: { price: 100 or -100})

> Pushing / Pulling Document

      // Removing single item from array
      db.COLLECTION.updateMany({ name: "lennon" }, { $pull: { previews: "http://...jpg" } })
      
      // Adding single item to array
      db.COLLECTION.updateMany({ name: "lennon" }, { $push: { previews: "http://...jpg" } })

      // Adding multiple item to array
      db.COLLECTION.updateOne({ _id: ObjectId(XXX) }, { $push: { previews: { $each: [ { name: "", url: "" } ] } } })





## 🌿 MongoDB Atlas
Mongo Atlas allows us to host our database in the cloud. To get started, what we gonna do is, first:

### ➡️ Create an account to their official website

      https://www.mongodb.com/cloud/atlas/register



