var express = require('express');
var router = express.Router();
var products = [
   {id:1001,name:"mobile1718",description: "Smart phone vivo 1718",rate:18000,manufacturer:"vivo"},
   {id:1002,name:"mobile1719",description:"Smart phone vivo 1719",rate:20000,manufacturer:"vivo"},
   {id:1003,name:"TV40",description:"Sony Bravio,rate:56000",manufacturer:"sony"},
   {id:1004,name:"TV80",description:"Sony Bravio 80 Internet",rate:90000,manufacturer:"sony"},
   {id:1005,name:"IMAC",description:"IMAC",rate:150000,manufacturer:"apple"}
];
router.get('/', function(req, res){
   res.json(products);
});
/*
router.get('/products/manufacturer', function(req, res){
   var currProducts = products.filter(function(product){
      if(product.manufacturer == req.params.manufacturer){
         return true;
      }
   })
   }); */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.get('/manufacturer/:manufacturer', function(req, res){
   console.log('inside manufacturer');
   var currProducts = products.filter(function(product){

      console.log('manufacturer from post :', req.params.manufacturer);
      console.log('manufacturer from array :', product.manufacturer);

      if(product.manufacturer == req.params.manufacturer){
         console.log("main")
         return true;
      }
   });

   console.log('current products ',currProducts);
   if(currProducts.length >= 1){
      console.log("if")
      res.json(currProducts)
   } else {
      console.log("else")
      res.status(404);//Set status to 404 as product was not found
      res.json({message: "Not Found"});
   }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

router.get('/:id([0-9]{3,})', function(req, res){
   var currProducts = products.filter(function(product){
      if(product.id == req.params.id){
         return true;
      }
   });
   if(currProducts.length == 1){
      res.json(currProducts[0])
   } else {
      res.status(404);//Set status to 404 as product was not found
      res.json({message: "Not Found"});
   }
});

router.post('/', function(req, res){
   console.log('post request');
   //Check if all fields are provided and are valid:
   if(
      !req.body.name ||
      !req.body.description ||
      !req.body.rate||
      !req.body.manufacturer) {      
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      console.log('create else');
      var newId = products[products.length-1].id+1;
      products.push({
         id: newId,
         name: req.body.name,
         description:req.body.description,
         rate:req.body.rate,
         manufacturer:req.body.manufacturer
         
      });
res.json({message: "New product created.", 
   location: "/products/" + newId});
   }
});

router.put('/:id', function(req, res){
   //Check if all fields are provided and are valid:
   if(!req.body.name ||
      !req.body.description ||
      !req.body.rate||
      !req.body.manufacturer||
      !req.params.id.toString().match(/^[0-9]{3,}$/g)){
      
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      //Gets us the index of product with given id.
      var updateIndex = products.map(function(product){
         return product.id;
      }).indexOf(parseInt(req.params.id));
      
      if(updateIndex === -1){
         //product not found, create new
         products.push({
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            rate: req.body.rate,
            manufacturer: req.body.manufacturer
         });
res.json({message: "New product created.", 
   location: "/products/" + req.params.id});
      } else {
         //Update existing product
         products[updateIndex] = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            rate: req.body.rate,
            manufacturer: req.body.manufacturer
         };
         res.json({message: "product id " 
            + req.params.id + " updated.", 
            location: "/products/" + req.params.id});
      }
   }
});

router.delete('/:id', function(req, res){
   var removeIndex = products.map(function(product){
      return product.id;
   }).indexOf(parseInt(req.params.id))//Gets us the index of product with given id.
   console.log('remove index', removeIndex);
   if(removeIndex === -1){
      res.json({message: "Not found"});
   } else {
      products.splice(removeIndex, 1);
      res.send({message: "product id " 
         + req.params.id + " removed."});
   }
});

//Routes will go here
module.exports = router;