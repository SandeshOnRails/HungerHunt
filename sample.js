'use strict';

const yelp = require('yelp-fusion');

const express = require("express");

const app = express();

const bodyParser = require("body-parser");





let data ={};


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = 'VKoaTzGZdP6AJfTf6vubDvA0LMDyllv7do26txusFNcD3BX_A1qxC9ZgG0tg2-ZnuARpfIRJuV9Q1CaAJX_zNepBJ2AvyJGnN29tL-gkM6V4vd-q556G_wG5MpbSWnYx';

const searchRequest = {
  term:'Halal',
  location: 'union city, ca'
};

const client = yelp.client(apiKey);




app.get("/", function(req, res){
	res.render("index");
})

app.post("/search", function(req, res){

	

    let food = req.body.food;
    let loc = req.body.city + ", " + req.body.state;

     data = {

    	term: food,
    	location: loc

    };

	client.search(data).then(function(response){
		
		let results = response.jsonBody.businesses;
	    res.render("results", {results: results});

	}).catch(function(err){
	console.log(err);
})

})
  
app.get("/search/reviews/:id", function(req, res){

	
const businessId = req.params.id.substring(1);

console.log(req.params.id);


 client.reviews(businessId).then(function(response){
 
      const revs = response.jsonBody.reviews;

      console.log(revs[0].text);


      res.render("reviews.ejs", {revs: revs});
 })
 .catch(function(err){
 	console.log(err);
 })

})

app.listen(5000, function(){

	console.log("Server Running");
})