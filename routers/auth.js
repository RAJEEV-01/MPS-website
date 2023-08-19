const router = require('express').Router();
const bcrypt = require('bcrypt');
const prisma = require('../helpers/prisma');
const { createToken } = require('../helpers/jwt');

router.post('/login', async function (req,res) {
    try {
        const { employeeId, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                employeeId: employeeId
            }
        });
        if(user)
        {
            const check = await bcrypt.compare(password,user.password);
            if(check)
            {
                res.json({
                    token: await createToken({ employeeId: employeeId }),
                    user: {
                        employeeId: employeeId,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                    }
                });
            }else{
                res.status(401).json({
                    message: "Incorrect password"
                });
            }
        }else{
            res.status(401).json({
                message: "Incorrect employeeId/password"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong..."
        });
    }
});

router.post('/register', async function (req,res) {
    try {
        const { employeeId, email, name, phone, password } = req.body;

        if( !employeeId || !email || !name || !phone || !password)
        {
            return res.status(401).json({
                message: "fill all the details",
                body: req.body
            });
        }

        const check = await prisma.user.findUnique({
            where: {
                employeeId: employeeId
            }
        });

        if(check)
        {
            console.log( employeeId, " already registered..");
            return res.status(400).json({
                message: `${employeeId} is already registered..`
            });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        let user = await prisma.user.create({
            data: {
                employeeId,
                email,
                name,
                phone,
                password: hashPassword
            }
        });
        console.log("successfully registered..");
        console.log(user);
        res.json({
            message: "successfully registerd.."
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong..."
        });
    }
});

module.exports = { authRouter : router}