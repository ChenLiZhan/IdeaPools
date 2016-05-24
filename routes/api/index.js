var express = require('express');
var app = express.Router();

var record = require('./record');



app.post('/condition1/row', record.createCondition1);
app.post('/condition1/msip', record.updateCondition1MSIP);
app.post('/condition1/sp', record.updateCondition1SP);
app.post('/condition1/igt', record.updateCondition1IGT);

module.exports = app;