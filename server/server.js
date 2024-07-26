const dotenv = require("dotenv");
dotenv.config(); 
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
connectDB();
const app = express();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin:"https://blogger-website-hazel.vercel.app",
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
