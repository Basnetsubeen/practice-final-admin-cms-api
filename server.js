import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 9000;

//db connect

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

//apis

//check
app.get("/", (req, res) => {
  res.json({
    message: "Hi there, Are you lost ?",
  });
});

//Global error handler

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

//PORT
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
