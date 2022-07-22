# MONGODB COMMANDS

## importing & exporting data

```
# export using BSON
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

# export using JSON
mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json

# import using BSON
mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump
(--drop flag to overwrite the data)

# import using JSON
mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json

```

## Enter the shell

`mongosh`

## Show all the databases

`show dbs`

## switch to a database

`use <database name>`

## check the current database name

`db`

## show all the collections inside the current database

`show collections`

## check a collection from the current database

`db.<collection name>`

## adding one new document to the collection

`db.<collection name>.insertOne({...})`

## create a new collection and insert one document

`db.<new collection name>.insertOne({...})`

## insert mandy documents at once into a collection

`db.<collection name>.insertMany([{...},{...},{...},...])`

## show documents inside a collection

`db.<collection name>.find()`
>finds first 20 documents

## delete a document inside a collection

`db.<collection name>.deleteOne({_id:ObjectId("...")})`

## delete many documents inside a collection that matches the query

`db.<collection name>.deleteMany({query})`

## update a document inside a collection

`db.<collection name>.updateOne({_id:ObjectId("..")}, {$set: {key:value, key:value,..}})`

## update many documents inside a collection

`db.<collection name>.updateMany({query}, {$set: {key:value, key:value,..}})`

## update operators
- **set** -> entirely replace that property with a new value
- **inc** -> increase that property with the specified amount
- **pull** -> pulls a value from an array property
- **push** -> pushes a value from an array property
- **each** -> push multiple values from an array property

## find stats related a query

` db.<collection name>.find({query}).explain('executionStats')`

## working with Indexes
- **create an index** :- `db.<collection name>.createIndex({key : value})`
- **list all the indexes** :- `db.<collection name>.getIndexes()`
- **drop an index** :- `db.<collection name>.dropIndex({key : value})`

## exit the shell

`exit`

