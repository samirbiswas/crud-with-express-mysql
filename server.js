const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const db = require("./dbServices");
const app = express();
const port = 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

db.connect(function (err) {
  if (err) throw err;
  console.log("Connect to the database");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server connected with port ${port}`);
});
