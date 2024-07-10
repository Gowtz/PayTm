const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require('./routes/user')
const account = require('./routes/account')
require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.URL;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(cors({
  origin:process.env.FRONT_URL,
  credentials:true
}));
app.use(cookieParser())


app.use('/api/v1/user/',user)
app.use('/api/v1/account/',account)
mongoose
  .connect(MONGO_URI)
  .then(
    app.listen(PORT, () =>
      console.log(`the server is running in ${URL}:${PORT}`)
    )
  )
  .catch((err) => console.log(err));
