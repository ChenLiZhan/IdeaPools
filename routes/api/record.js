var async = require('async');
var Promise = require('bluebird');
var GoogleSpreadsheet = require('google-spreadsheet');


function getSheet(workSheetIndex, callback) {
  var doc = new GoogleSpreadsheet('1WCR8GJ3RxHp7s5qImX2EXQluK-6AAtDuzLzW4_hNJY8');
  var sheet;

  async.series([
    function setAuth(step) {
      var creds_json = {
        "client_email": process.env.CLIENT_EMAIL,
        "private_key": process.env.PRIVATE_KEY
      };
      doc.useServiceAccountAuth(creds_json, step);
    },
    function getWorkSheet(step) {
      doc.getInfo(function(err, info) {
        sheet = info.worksheets[workSheetIndex];
        return callback(sheet);
      });
    }
  ]);
}

exports.createCondition1 = function(req, res) {
  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      var rowNum = parseInt(rows.length) + 1;
      var uid = 'A' + rowNum;
      sheet.addRow({
        uid: uid,
        msip: '',
        sp1: '',
        sp2: '',
        sp3: '',
        sp4: '',
        igt: ''
      });
      return res.json({
        success: true,
        data: {
          number: rowNum,
          uid: uid
        }
      });
    });
  });
};

exports.updateCondition1MSIP = function(req, res) {
  var number = req.body.number;
  var answer = req.body.answer;
  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      rows[number - 1].msip = answer;
      rows[number - 1].save(function() {
        return res.json({
          success: true
        });
      });
    });
  });
};

exports.updateCondition1SP = function(req, res) {
  var number = req.body.number;
  var answer1 = req.body.answer1;
  var answer2 = req.body.answer2;
  var answer3 = req.body.answer3;
  var answer4 = req.body.answer4;

  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      rows[number - 1].sp1 = answer1;
      rows[number - 1].sp2 = answer2;
      rows[number - 1].sp3 = answer3;
      rows[number - 1].sp4 = answer4;

      rows[number - 1].save(function() {
        return res.json({
          success: true
        });
      });
    });
  });
};

exports.updateCondition1IGT = function(req, res) {
  var number = req.body.number;
  var answer = req.body.ideas;

  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      rows[number - 1].igt = answer.join('\n======\n');
      rows[number - 1].save(function() {
        return res.json({
          success: true
        });
      });
    });
  });
};