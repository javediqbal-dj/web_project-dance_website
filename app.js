const express = require('express')
const path = require("path")
const app = express()
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
var mongoDB = 'mongodb://127.0.0.1/contactDance';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;
// Define mongoose Schema

var contactSchema = new mongoose.Schema({
  name: String,
  phone:String,
  email:String,
  address:String,
  desc:String
});

var contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // for serving a static file
app.use(express.urlencoded());

// PUG SPECIFIC STUFF in folder views
app.set("view engine", "pug"); // set the template engine as pug view engine konsa use krna chahte hai
app.set("views", path.join(__dirname, "views")); // set the views directory konsi directory se read krna chahte ha

//END POINTS
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
  });
app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("../views/contact.pug", params);
  });
app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("this item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("this item has been saved to the database")
    })

  });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})