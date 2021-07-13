exports.getPrivateRoute = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: "LOGGED IN : You got access to the private data in this route",
    });
};
