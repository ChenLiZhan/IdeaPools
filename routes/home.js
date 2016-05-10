exports.index = function(req, res) {
  return res.render("index", {
    title: "Jenny's Experiment"
  });
};