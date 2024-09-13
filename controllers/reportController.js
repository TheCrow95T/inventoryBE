import mysql from "mysql";

export const salesByCategory = (req, res) => {
  const { year } = req.body;

  if (!year) {
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

      let sql = "CALL sales_by_category(?)";

      conn.query(sql, [year], (error, results, fields) => {
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

export const salesByProductInCategory = (req, res) => {
  const { id: category_id } = req.param;
  const { year } = req.body;

  if (!category_id || !year) {
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

      let sql = "CALL sales_by_product(?,?)";

      conn.query(sql, [category_id, year], (error, results, fields) => {
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

export const purchaseByCategory = (req, res) => {
  const { year } = req.body;

  if (!year) {
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

      let sql = "CALL purchases_by_category(?)";

      conn.query(sql, [category_id, year], (error, results, fields) => {
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

export const purchaseByProductInCategory = (req, res) => {
  const { id: category_id } = req.param;
  const { year } = req.body;

  if (!category_id || !year) {
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

      let sql = "CALL purchases_by_product(?,?)";

      conn.query(sql, [category_id, year], (error, results, fields) => {
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
