const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.json({response: 'unauthenticated'});
  } else {
    next();
  }
};

module.exports = sessionChecker;
