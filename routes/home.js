exports.index = function(req, res) {
  return res.render("index", {
    title: 'the service is up and running.'
  });
};

exports.index1 = function(req, res) {
  return res.render("index1", {
    title: 'condition 1'
  });
};

exports.index2 = function(req, res) {
  return res.render("index2", {
    title: 'condition 2'
  });
};

exports.index3 = function(req, res) {
  return res.render("index3", {
    title: 'condition 3'
  });
};

exports.index4 = function(req, res) {
  return res.render("index4", {
    title: 'condition 4'
  });
};