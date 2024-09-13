import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from 'path';
// import { fileURLToPath } from 'url';
import { login } from "./controllers/adminController.js";
import admin from "./routes/admin.js";
import dashboard from "./routes/dashboard.js";
import operation from "./routes/operation.js";
import report from "./routes/report.js";
import authenticate from "./middleware/jwtCheck.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/error.js";
import headerCheck from "./middleware/headerCheck.js";
const port = process.env.PORT || 8000;

// Get the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware for incoming
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Header check
app.use(headerCheck);

// Routes
app.post("/api/login", login);
app.use("/api/admin", authenticate, admin);
app.use("/api/dashboard", authenticate, dashboard);
app.use("/api/operation", authenticate, operation);
app.use("/api/report", authenticate, report);

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
