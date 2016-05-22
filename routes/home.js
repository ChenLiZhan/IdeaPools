exports.index = function(req, res) {
  return res.render("index", {
    title: "IdeaPool"
  });
};

exports.condition1Intro = function(req, res) {
  return res.render("condition1-intro", {
    title: "IdeaPool"
  });
}