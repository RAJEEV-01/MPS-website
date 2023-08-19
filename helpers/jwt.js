const prisma = require('./prisma');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path : "../.env" });

const createToken = async function(payload) {
    return jwt.sign( payload, process.env.JWT_SECRET, {
        expiresIn : '24h'
    });
};

const verifyToken = async function (req, res, next) {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({
                message: "No token"
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name && err.name == "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token expired"
                    });
                }
                return res.status(401).json({
                    message: "Invalid token or Token expired"
                });
            }
            req.employeeId = decoded.employeeId;
            const user = await prisma.user.findUnique({
                where: {
                    employeeId: req.employeeId,
                },
                select : {
                    employeeId : true,
                }
            })
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "Error : " + err.message
        })
    }
};

module.exports = { createToken, verifyToken}