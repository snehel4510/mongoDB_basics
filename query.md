# Using filters over a collection

> using sample dataset books colection

find all documents

`db.books.find()`

filter all documents whose author is snehel

`db.books.find({author:"snehel"})`

filter all documents whose author is ankur & pages = 300

`db.books.find({author:"ankur", pages:300})`

find all documents but display only title & author

`db.books.find({},{title:1,author:1})`

find One document (via it's id)

`db.books.findOne({_id:...})`

## chaining methods to apply more advance filters

find the count of all the documents

`db.books.find().count()`

limit output to 3 documents

`db.books.find().limit(3)`

sorting the documents (books by author name alphabetically)

`db.books.find().sort({author:1})`
> 1 means acsending & -1 means descending

find 3 books with most number of pages sorted by rating

`db.books.find({},{title:1,pages:1,rating:1}).sort({pages:-1},{rating:1}).limit(3)`


## using operators to query data

`db.books.find({key:{$operator:value}})`

### MONGODB OPERATORS

- **gt** -> greater than
- **lt** -> less than
- **lte** -> less than or equal to
- **gte** -> greater than or equal to
- **or** -> `db.books.find({$or:[{query1},{query2}]})`
- **in** -> fetch all books included within the range : `db.books.find({rating:{$in:[7,8,9]}})`
- **nin** -> fetch all books that are not included within the range : `db.books.find({rating:{$nin:[7,8,9]}})`

### Querying Arrays

- Find books that contain 'fiction' as it's genres : `db.books.find({genres:'fiction'})`
- Find books that contain only 'comedy'as it's genre(exact match) : `db.books.find({genres:['comedy']})`
- Find all books that contain both 'fiction' & 'drama' as it's genres : `db.books.find({genres:{$all:['fiction','drama']}})`

### Querying Nested Dcouments

Find all books where there is a review by Ankur -> `db.books.find({"reviews.name" : "ankur"})`