const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")


const app = express();

var Items = ["Buy Grocery Items" , "Go To Swiming Sessions" , "Do Freelance Work"];
let workItems = ["Make API Calls" , "Connect NodeMCU" , "Make Github Repo"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set('view engine', 'ejs');


app.get("/",function(req,res){

    let kindOfDay = date.getDay();

    res.render("list",{listTitle : kindOfDay , listItems : Items});
});

app.get("/work",function(req,res){


    res.render("list",{listTitle : "Work" , listItems : workItems});
});

app.get("/about",function(req,res){
    res.render("about");
});


app.post("/",function(req,res){
    
    var newListItem = req.body;

    if(newListItem.listType === "Work"){
        workItems.push(newListItem.newItem);
        res.redirect("/work");
    }else{
        Items.push(newListItem.newItem);
        res.redirect("/");
    }
});

app.listen(3000,function(){
    console.log("Server started at port 3000");
});