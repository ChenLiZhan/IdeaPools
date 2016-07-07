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

exports.originalIntro = function(req, res) {
  return res.render("original-intro", {
    title: "IdeaPool"
  });
}

exports.creativityIntro = function(req, res) {
  return res.render("creativity-intro", {
    title: "IdeaPool"
  });
}

exports.originalityIntro = function(req, res) {
  return res.render("originality-intro", {
    title: "IdeaPool"
  });
}