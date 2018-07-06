var express = require("express")
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/clinic-pesa");

// creating schema

var clientSchema = new mongoose.Schema({
    name: String,
    gender: String,
    location: String,
    geocode: Number,
    dob: Date,
    country: String,
    district: String,



});

// callling the schema created above
var User = mongoose.model("guys", clientSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app/index.html");
});

app.post("/clientdetails", (req, res) => {
    var myData = new User(req.body);
    console.log(myData);
    myData.save()
        .then(item => {
            console.log(item);
            res.send('item saved to databsase');
        })

    .catch(err => {
        res.status(400).send("unable to save to databse");

    });

});

//defining the port on wchich our client side endpoint listens

app.listen(3000, function() {
    console.log('Sample app listening on 3000')
});