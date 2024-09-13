const headerCheck = (req, res, next) => {
  if (req.headers["api-key"] !== process.env.API_KEY) {
        return res.status(403).json({ msg: "Insufficient header sent" });
  }
  next();
};

export default headerCheck;
