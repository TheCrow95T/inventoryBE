import mysql from "mysql";

export const listCategories = (req, res) => {
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

            let sql = "CALL show_all_categories()";

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

export const createCategories = (req, res) => {
    const { category_name, user_id } = req.body;

    if (!category_name || !user_id) {
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

            let sql = "CALL create_categories(?,?)";

            conn.query(sql, [category_name, user_id], (error, results, fields) => {
                if (error) return console.error(error.message);
                console.log(results);
            });

            // close the database connection
            conn.end();
        });
        res.json({ message: "Category create sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const editCategories = (req, res) => {
    const { category_id, category_name, user_id } = req.body;

    if (!category_id || !category_name || !user_id) {
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

            let sql = "CALL edit_categories(?,?,?)";

            conn.query(
                sql,
                [category_id, category_name, user_id],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Category create sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const listProducts = (req, res) => {
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

            let sql = "CALL show_all_products()";

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

export const createProduct = (req, res) => {
    const { product_name, category_id, buying_price, selling_price, user_id } =
        req.body;

    if (
        !product_name ||
        !category_id ||
        !buying_price ||
        !selling_price ||
        !user_id
    ) {
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

            let sql = "CALL create_product(?,?,?,?,?)";

            conn.query(
                sql,
                [product_name, category_id, buying_price, selling_price, user_id],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Product create sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const editProduct = (req, res) => {
    const {
        product_id,
        product_name,
        category_id,
        buying_price,
        selling_price,
        user_id,
    } = req.body;

    if (
        !product_id ||
        !product_name ||
        !category_id ||
        !buying_price ||
        !selling_price ||
        !user_id
    ) {
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

            let sql = "CALL edit_product(?,?,?,?,?,?)";

            conn.query(
                sql,
                [
                    product_id,
                    product_name,
                    category_id,
                    buying_price,
                    selling_price,
                    user_id,
                ],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Product edit sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const purchasesListByPage = (req, res) => {
    const { page } = req.body;

    if (page || page < 1) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    }

    let start_row = page == 1 ? 0 : (Math.round(page) - 1) * 50;

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

            let sql = "CALL show_50_purchase(?)";

            conn.query(sql, [start_row], (error, results, fields) => {
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

export const postPurchase = (req, res) => {
    const { product_id, quantity, buying_price, user_id } = req.body;

    if (!product_id || !quantity || !buying_price || !user_id || quantity > 0) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    } else {
        quantity = Math.round(quantity);
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

            let sql = "CALL post_purchase_transaction(?,?,?,?)";

            conn.query(
                sql,
                [
                    product_id,
                    product_name,
                    category_id,
                    buying_price,
                    selling_price,
                    user_id,
                ],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Purchase post sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const reversePurchase = (req, res) => {
    const { product_id, quantity, buying_price, user_id } = req.body;

    if (!product_id || !quantity || !buying_price || !user_id || quantity < 0) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    } else {
        quantity = Math.round(quantity);
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

            let sql = "CALL reverse_purchase_transaction(?,?,?,?)";

            conn.query(
                sql,
                [
                    product_id,
                    product_name,
                    category_id,
                    buying_price,
                    selling_price,
                    user_id,
                ],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Purchase post sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const salesListByPage = (req, res) => {
    const { page } = req.query;

    if (page || page < 1) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    }

    let start_row = page == 1 ? 0 : (Math.round(page) - 1) * 50;

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

            let sql = "CALL show_50_sales(?)";

            conn.query(sql, [start_row], (error, results, fields) => {
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

export const postSales = (req, res) => {
    const { product_id, quantity, buying_price, user_id } = req.body;

    if (!product_id || !quantity || !buying_price || !user_id || quantity > 0) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    } else {
        quantity = Math.round(quantity);
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

            let sql = "CALL post_sales_transaction(?,?,?,?)";

            conn.query(
                sql,
                [
                    product_id,
                    product_name,
                    category_id,
                    buying_price,
                    selling_price,
                    user_id,
                ],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Sales post sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};

export const reverseSales = (req, res) => {
    const { product_id, quantity, buying_price, user_id } = req.body;

    if (!product_id || !quantity || !buying_price || !user_id || quantity < 0) {
        const error = new Error(`Insufficient body submitted`);
        error.status = 400;
        return next(error);
    } else {
        quantity = Math.round(quantity);
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

            let sql = "CALL reverse_sales_transaction(?,?,?,?)";

            conn.query(
                sql,
                [
                    product_id,
                    product_name,
                    category_id,
                    buying_price,
                    selling_price,
                    user_id,
                ],
                (error, results, fields) => {
                    if (error) return console.error(error.message);
                    console.log(results);
                },
            );

            // close the database connection
            conn.end();
        });
        res.json({ message: "Sales post sucess" });
    } catch (e) {
        console.log(e);
        res.json({ message: "database error" });
    }
};
