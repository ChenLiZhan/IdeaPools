var express = require('express');
var app = express.Router();

var record = require('./record');



app.post('/creative/row', record.createCreative);
app.post('/creative/msip', record.updateCreativeMSIP);
app.post('/creative/sp', record.updateCreativeSP);
app.post('/creative/igt', record.updateCreativeIGT);

app.post('/original/row', record.createOriginal);
app.post('/original/msip', record.updateOriginalMSIP);
app.post('/original/sp', record.updateOriginalSP);
app.post('/original/igt', record.updateOriginalIGT);

app.post('/creativity/row', record.createCreativity);
app.post('/creativity/msip', record.updateCreativityMSIP);
app.post('/creativity/sp', record.updateCreativitySP);
app.post('/creativity/igt', record.updateCreativityIGT);

app.post('/originality/row', record.createOriginality);
app.post('/originality/msip', record.updateOriginalityMSIP);
app.post('/originality/sp', record.updateOriginalitySP);
app.post('/originality/igt', record.updateOriginalityIGT);

module.exports = app;