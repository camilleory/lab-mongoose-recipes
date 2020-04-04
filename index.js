const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
        title: "hello",
        cuisine: "indian",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("something went wrong with create ===>", error);
      });
  })
  .then(() => {
    //InsertMany
    Recipe.insertMany([{
        title: "fondue",
        cuisine: "swiss",
      },
      {
        title: "spaghetti",
        cuisine: "italian",
      },
    ]);
    Recipe.insertMany(data).then(() => {

      //update
      Recipe.findOneAndUpdate({
        title: "Rigatoni alla Genovese",
      }, {
        duration: 100,
      }, {
        new: true,
      }).then((result) => {
        console.log("update",result);
      });
      // remove
    })
      .then(() => {
        Recipe.deleteOne({
          title: "Carrot Cake",
        }).then((recipe) => {
          console.log("Carrot Cake has been removed.", recipe);
        });
      })
    });
    
  

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });