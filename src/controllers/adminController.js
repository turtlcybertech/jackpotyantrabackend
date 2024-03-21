
const { createAdminFn, getAdminByUserIdFn } = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
    try {
        let { name, userid, password } = req.body;
        let secretKey = req.params.secretKey;
        if (process.env.CREATEADMIN_SECRET_KEY === secretKey) {
            if (!name || !userid || !password) {
                return res.status(400).send({ status: false, message: 'Bad Request' });
            }
            if (name === "" || userid === "" || password === "") {
                return res.status(400).send({ status: false, message: 'All Fields are required' });
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
            let data = { name, userid, password };
            let admin = await createAdminFn(data);
            admin.password = undefined;
            return res.status(201).send({ status: true, message: "Admin created Successfully", data: admin })
        } else {
            return res.status(403).send({ status: false, message: "You are not authorized to perform this action" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
const adminLogin = async (req, res) => {
    try {
        let { userid, password } = req.body;
        if (!userid || !password) {
            return res.status(400).send({ status: false, message: 'Bad Request' });
        }
        if (userid === "" || password === "") {
            return res.status(400).send({ status: false, message: 'All Fields are required' });
        }
        let admin = await getAdminByUserIdFn(userid);
        if (!admin) {
            return res.status(400).send({ status: false, message: 'Plese provide valid userId and password' });
        }
        bcrypt.compare(password, admin.password, function (err, result) {
            if (err) {
                return res
                    .status(400)
                    .send({ status: false, message: err.message });
            }
            hasAccess(result);
        });

        function hasAccess(result) {
            if (result) {
                let date = Date.now();
                let data = {};
                let issueTime = Math.floor(date / 1000);
                let token = jwt.sign(
                    {
                        userId: admin.userid,
                        iat: issueTime,
                    },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: "12h" }
                );
                data.token = token;
                data.name = admin.name;
                res.setHeader("Authorization", "Bearer", token);
                return res.status(200).send({
                    status: true,
                    message: "Successfully loggedin",
                    data: data,
                });
            }
            else {
                return res
                    .status(401)
                    .send({ status: false, message: "Login denied" });
            }
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { adminLogin, createAdmin };