import mysql from "mysql";

export const totalCategory =  (req, res) => {

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

      let sql = "CALL total_category()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({...results[0][0]});
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const totalProduct =  (req, res) => {

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

      let sql = "CALL total_product()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({...results[0][0]});
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const topFiveSales =  (req, res) => {

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

      let sql = "CALL top_5_sales()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0][0] });
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const recentFiveSales =  (req, res) => {

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

      let sql = "CALL recent_5_sales()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0][0] });
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};

export const recentFiveProduct =  (req, res) => {

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

      let sql = "CALL recent_5_product()";

      conn.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        console.log(results);
        res.json({ ...results[0][0] });
      });

      // close the database connection
      conn.end();
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "database error" });
  }
};
