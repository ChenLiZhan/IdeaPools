exports.index = function(req, res) {
  return res.render("index", {
    title: "IdeaPool"
  });
};

exports.creativeIntro = function(req, res) {
  return res.render("creative-intro", {
    title: "IdeaPool"
  });
}