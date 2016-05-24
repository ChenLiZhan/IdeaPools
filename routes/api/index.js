var express = require('express');
var app = express.Router();

var record = require('./record');



app.post('/creative/row', record.createCreative);
app.post('/creative/msip', record.updateCreativeMSIP);
app.post('/creative/sp', record.updateCreativeSP);
app.post('/creative/igt', record.updateCreativeIGT);

module.exports = app;