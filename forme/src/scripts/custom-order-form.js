//"use strict";

var fs = require('./FileSaver');
//var fileSav = require('file-saver-master');
require('whatwg-fetch');
var promise = require('promise');

//import "/FileSaver.js";

import React from "react";

import DatePicker from "react-datepicker";
import "./../styles/react-datepicker.css";
import moment from "moment";

import t from "tcomb-form";
var Form = t.form.Form;

import Order from "./order-model.js";

function billingAddressTemplate(locals) {
    return (
      <div>
          <h3>Custom billing address form</h3>
          <div>{locals.inputs.street}</div>
      </div>
    );
}

function isNull(value) {
    if (value == null)
        return true;

    return (value.length) && (value.every((item) => item == null));
}
function datepicker(locals) {
    console.log(locals);
    console.log(moment(locals.value));

    //TODO: check for better null value recognizing
    var value = (isNull(locals.value) ? null : locals.value);
    console.log(value);
    return (
        <div>
            <div style={{color: (locals.hasError) ? "red" : "black"}}>{locals.label}</div>
            <DatePicker
                selected={value && moment(value)}
                onChange={(value) => locals.onChange.call(null, (value) ? value.toArray() : [null, null, null])}
                isClearable={true}/>
            <div style={{color: "red"}}>{(locals.hasError) ? locals.error : null}</div>
        </div>
    )
}

function onTestDateChange(date) {
    console.log(date);
    this.setState({testDate: date});
}

class CustomOrderForm extends React.Component {
    constructor() {
        super();
        this.state = {
            testDate: moment(),
            orderFormValue: {
                activatedDate: new Date()
            }
        }
    }
    save() {
        var value = this.refs.form.getValue();
        if (value){
            console.log(value);
        }
        else {
            //console.log('ASD');
            var validationResult = this.refs.form.validate();
            console.log(validationResult);
        }
        //console.log(value.billNumber);
        var items = [
        ];
        var item = {
            orderNumber: "",
            details: "",
            measure: "",
            quantity:"",
            price:"",
            summaryPrice:"",
            id:""
        };

        for (var i = 0; i < value.items.length; i++) {
            item.orderNumber = value.items[i].orderNumber;
            item.id = value.items[i].id;
            item.details = value.items[i].details;
            item.measure = value.items[i].measure;
            item.quantity = value.items[i].quantity;
            item.price = value.items[i].price;
            item.summaryPrice = value.items[i].summaryPrice;
            items.push(item);
        }   

        var data = {
            billNumber: value.billNumber,
            number: value.number,
            deliveryDate: value.deliveryDate,
            deliveryType: value.deliveryType,
            distributor: value.distributor,
            myCompany:{
                name: value.myCompany.name,
                town: value.myCompany.town,
                adress: {
                    street: value.myCompany.adress.street,
                    number: value.myCompany.adress.number,
                    zip: value.myCompany.adress.zip,
                    country: value.myCompany.adress.country
                }
            },
            partnerCompany:{
                name: value.partnerCompany.name,
                town: value.partnerCompany.town,
                adress: {
                    street: value.partnerCompany.adress.street,
                    number: value.partnerCompany.adress.number,
                    zip: value.partnerCompany.adress.zip,
                    country: value.partnerCompany.adress.country
                }  
            },
            items: items
        }

        function action(response) {
            //responseType = 'arraybuffer';
            alert('asd' + response);
            var blob = new Blob([response], {type:'blob'});
            alert(blob);
            fs.saveAs(blob, "order.xlsx");
        };

        // var parseBlob = function (response) {
        //   return response.blob();
        // };

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        };

        function ispisi(response){
            if(response.ok){
               alert("Ispisi odgovor: " + response.type) 
           }else{
            alert("Nesto nije kako treba")
           }
            
        };
        // var downloadFile = function () {
        //     return fetch('http://localhost:3000/generate')
        //     .then(checkStatus)
        //     .then(parseBlob)
        //     .then(action);
        // };

        var dataSend = '' + JSON.stringify(data);
        alert(dataSend);
        fetch('http://localhost:3000/generate',{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataSend
        })
        .then(checkStatus)
        
        .then(function(response){
            return response.blob();
        })
        .then(action)
        
        .then(function(data){
            alert('successfully received response with data ', data);
        }).catch(function(err){
            alert('request failed ' + err);
        });


        // fetch('/')
        // //.then(ispisi)
        // .then(function(response){
        //     return response.blob();
        // })
        // .then(action);
        

    }
    onChange(value, path, kind){
        console.log({
            value,
            path,
            kind,
            component: this.refs.form.getComponent(path)
        });
        this.setState({orderFormValue:value});
    }
    render() {
        var options = {
            fields: {
                activatedDate: {
                    label: <span>Activated date <b>(custom field template)</b></span>,
                    error: "not a valid value",
                    template: datepicker
                },
                billingAddress: {
                    template: billingAddressTemplate
                }
            }
        };

        return (
            <div>
                <Form
                    ref="form"
                    type={Order}
                    options={options}
                    value={this.state.orderFormValue}
                    onChange={this.onChange.bind(this)}
                    />
                <button onClick={this.save.bind(this)}>Save</button>
            </div>
        );
    }
}

export default CustomOrderForm;