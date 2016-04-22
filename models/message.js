'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
let moment = require('moment');

var dataFile = path.join(__dirname, '../data/messages.json');
console.log( 'dataFile: ', dataFile );
// this is going to have the job of interacting with the data

exports.findAll = function(callback) {

  fs.readFile(dataFile, (err, data) => {
    if(err) {
      callback(err);
      return;
    }
    try {
      var messages = JSON.parse(data);
    } catch(err) {
      return callback(err);
    }

    callback(null, messages);
  });
};

//create a new message and save it to the database
exports.create = function(message, callback) {
  if(!message.name || !message.text) {
    return callback('Message must have name and text.');
  }

  this.findAll((err, messages) => {
    if(err) {
      return callback(err);
    }

    var newMessage = {
      text: message.text,
      name: message.name,
      date: moment().format(),
      url: message.url,
      id: uuid()
    };

    messages.push(newMessage);

    fs.writeFile(dataFile, JSON.stringify(messages), err => {
      callback(err);
    });
  });
};

//find one message by id
exports.findById = function(id, callback) {
  if(!id) return callback('id required.');

  this.findAll((err, messages) => {
    if(err) return callback(err);
    var message = messages.filter(message => message.id === id)[0];
    return callback(null, message);
  });
}


// exports.deleteById((err, messages) => {
//   var len = Message.length;
//
//   console.log( 'len: ', len );
//
//   var messages = Message.filter(message => Message.id !== id)[0];
//
// })



//read
//parse
//modify
//stringify
//write

// /////////////////
//
// Message.findAll(function(err,messages) {
//
//
// })
