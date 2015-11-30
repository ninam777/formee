"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var XlsxTemplate = require('xlsx-template');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');


var app = express();
var compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(devMiddleware);

app.use(hotMiddleware);

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index_dev.html'));
});

var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');  
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.post('/generate',cors, function (req, res) {
  var data = req.body;
	console.log('successfully received request!');
  console.log('request body is '+data.myCompany.name);

  var values = {
    number: data.number,
    billNumber: data.billNumber,
    deliveryDate: data.deliveryDate,
    deliveryType: data.deliveryType,
    distributor: data.distributor,
    item: data.items,
    company1: [{
      name: data.myCompany.name,
      town: data.myCompany.town,
      
        street: data.myCompany.adress.street,
        number: data.myCompany.adress.number,
        zip: data.myCompany.adress.zip,
        country: data.myCompany.adress.country
      
    }],
    company2: [{
      name: data.partnerCompany.name,
      town: data.partnerCompany.town,
      
        street: data.partnerCompany.adress.street,
        number: data.partnerCompany.adress.number,
        zip: data.partnerCompany.adress.zip,
        country: data.partnerCompany.adress.country
      
    }]
  };

  var vrednosti = {
  	ime: data.myCompany.name,
  	prezime: data.partnerCompany.name
  };

	fs.readFile(path.join(__dirname, 'templates', 'naruci.xlsx'), function(err, data) {
    var template = new XlsxTemplate(data);

    var sheetNumber = 1;
    //console.log(data.myCompany.name);
    
    console.log(values);
    console.log(vrednosti);

    template.substitute(sheetNumber, values);
    //console.log(data);
    var data = template.generate();

    
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    console.log(new Buffer(data, 'binary'));
    res.send(new Buffer(data, 'binary'));
    console.log("succes");
  });

});


app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
