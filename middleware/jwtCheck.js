import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];
  console.log("accessToken: " + accessToken);
  console.log("refreshToken: " + refreshToken);

  if (!accessToken && !refreshToken) {
    console.log("Access Denied.");
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const expiryTime = 1000 * 60 * 30; // 30 mins
      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.JWT_SECRET,
        {
          expiresIn: expiryTime,
        },
      );

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          sameSite: "strict",
        })
        .cookie("accessToken", accessToken, {
          maxAge: expiryTime,
          sameSite: "strict",
        });
      next();
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};

export default authenticate;
