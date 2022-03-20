const checkLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(404).json({
      status: "fail",
      message: "로그인 하고 오셔야 합니다.",
    });
    next();
  } else {
    next();
  }
};

export { checkLogin };
