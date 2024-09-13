import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc   Get all posts
// @route  GET /api/admin/*
export const createGroup = (req, res) => {
  const { groupname, lvl, description } = req.body;

  if (!groupname || !lvl || !description) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  let panel_accessibility;
  let general_accessibility;

  if (lvl == 1) {
    panel_accessibility = "11111";
    general_accessibility = "111";
  } else if (lvl == 2) {
    panel_accessibility = "01111"; // no access on user mgmt
    general_accessibility = "111";
  } else {
    panel_accessibility = "01110"; // no access on user mgmt and report
    general_accessibility = "011"; // read only got category
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL create_group(?,?,?,?,?)";

      conn.query(
        sql,
        [
          groupname,
          lvl,
          panel_accessibility,
          general_accessibility,
          description,
        ],
        (error, results, fields) => {
          if (error) return console.error(error.message);
          console.log(results);
        },
      );

      // close the database connection
      conn.end();
    });
    res.json({ message: "Group create sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const createUser = async (req, res) => {
  const { fullname, username, groupId, password } = req.body;

  if (!fullname || !username || !groupId || !password) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL create_user(?,?,?,?)";

      conn.query(
        sql,
        [fullname, username, groupId, hashedPassword],
        (error, results, fields) => {
          if (error) return console.error(error.message);

          console.log(results);
        },
      );

      // close the database connection
      conn.end();
    });
    res.json({ message: "User create success!" });
  } catch (e) {
    res.json({ message: "database error" });
  }
};

export const listGroup = async (req, res) => {
  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL list_group()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        res.json({ ...results[0] });
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    res.json({ message: "Error1" });
  }
};

export const listUser = async (req, res) => {
  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL list_user()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0] });
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    res.json({ message: "Error1" });
  }
};

export const editGroup = (req, res) => {
  const { groupname, lvl, description } = req.body;

  if (!groupname || !lvl || !description) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  let panel_accessibility;
  let general_accessibility;

  if (lvl == 1) {
    panel_accessibility = "11111";
    general_accessibility = "111";
  } else if (lvl == 2) {
    panel_accessibility = "01111"; // no access on user mgmt
    general_accessibility = "111";
  } else {
    panel_accessibility = "01110"; // no access on user mgmt and report
    general_accessibility = "011"; // read only got category
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL edit_group(?,?,?,?,?)";

      conn.query(
        sql,
        [
          groupname,
          lvl,
          panel_accessibility,
          general_accessibility,
          description,
        ],
        (error, results, fields) => {
          if (error) return console.error(error.message);
          console.log(results);
          res.json({ ...results[0][0] });
        },
      );

      // close the database connection
      conn.end();
    });
    res.json({ message: "Group edit sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const editUser = async (req, res) => {
  const { fullname, username, groupId, password } = req.body;

  if (!fullname || !username || !groupId || !password) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL edit_user(?,?,?,?)";

      conn.query(
        sql,
        [fullname, username, groupId, hashedPassword],
        (error, results, fields) => {
          if (error) return console.error(error.message);
          console.log(results);
          res.json({ ...results[0][0] });
        },
      );

      // close the database connection
      conn.end();
    });
    res.json({ message: "User edit sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const deleteGroup = (req, res) => {
  const { groupname } = req.body;

  if (!groupname) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL delete_group(?)";

      conn.query(sql, [groupname], (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0][0] });
      });

      // close the database connection
      conn.end();
    });
    res.json({ message: "Group delete sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const deleteUser = (req, res) => {
  const { username } = req.body;

  if (!username) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL delete_user(?)";

      conn.query(sql, [username], (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0][0] });
      });

      // close the database connection
      conn.end();
    });
    res.json({ message: "User delete sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const changePassword = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL change_password(?,?)";

      conn.query(sql, [username, password], (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
      });

      // close the database connection
      conn.end();
    });
    res.json({ message: "password change sucess" });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error(`Insufficient body submitted`);
    error.status = 400;
    return next(error);
  }

  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    conn.connect((err) => {
      if (err) return console.error(err.message);

      let sql = "CALL select_user(?)";

      conn.query(sql, [username], async (error, results) => {
        if (error) return console.error(error.message);

        if (results[0].length < 1) {
          conn.end();
          console.log("username not found for " + username);
          return res.json({ message: "username not found" });
        }

        console.log(results[0][0]);
        const compare = await bcrypt.compare(password, results[0][0].password);

        const expiryTime = 1000 * 60 * 30; // 30 mins

        if (compare) {
          const user = {
            username: username,
            password: results[0][0].password,
            panel_accessibility: results[0][0].panel_accessibility,
            general_accessibility: results[0][0].general_accessibility,
          };
          const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: expiryTime,
          });
          const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          let data = {
            panel_accessibility: results[0][0].panel_accessibility,
            general_accessibility: results[0][0].general_accessibility,
          };
          res
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24,
              sameSite: "strict",
            })
            .cookie("accessToken", accessToken, {
              maxAge: expiryTime,
              sameSite: "strict",
            })
            .json({ data });

          //update login time
          let sql2 = "CALL update_user_lastlogintime(?)";

          conn.query(sql2, [username], async (error, results, fields) => {
            if (error) return console.error(error.message);
            console.log("update login time success");
            conn.end();
          });
        } else {
          console.log("Password is wrong for user " + username);
          res.json({ message: "Wrong password" });
          conn.end();
        }
      });

      // close the database connection
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};
