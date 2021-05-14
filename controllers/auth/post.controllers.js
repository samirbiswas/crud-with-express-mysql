const db = require("../../dbServices");
const { checkPaylaod } = require("../../utils");
const { signupValidator } = require("../../validation");
const bcrypt = require("bcryptjs");
exports.signupUser = async (req, res) => {
  try {
    //const { username, email, password, confirm_password } = ;
    //console.log(req.fields);
    const bodyData = req.body;

    if (checkPaylaod(bodyData)) {
      return res.status(400).json({
        status: false,
        message: "payload not fouund",
      });
    }
    const { data, isValid, errors } = signupValidator(bodyData);
    if (!isValid) {
      return res.status(400).json({ status: false, errors });
    }
    data.password = await bcrypt.hash(data.password, 12);
    const sql =
      await `INSERT INTO users (username, email,password) VALUES ('${data.username}', '${data.email}',
    '${data.password}')`;

    db.query(sql, (err, result) => {
      if (err) {
        throw err;
        console.log("1 record inserted");
      }
    });
    return res.json({
      status: true,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
