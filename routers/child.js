const router = require('express').Router();
const prisma = require('../helpers/prisma');

router.get('/get/:id', async function (req,res) {
    try {
        const childId = req.params.id;
        if(isNaN(id))
        {
            return res.status(400).json({
                message: "Invalid request.."
            })
        }
        const child = await prisma.child.findUnique({
            where: {
                aadharNumber: childId
            }
        });
        if(!child)
        {
            return res.status(400).json({
                message: "No child exists.."
            })
        }
        res.json(child);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong.."
        });
    }
});

router.post('/add', async function (req,res) {
    try {
        const { name, age, dob, aadharNumber, fatherName, motherName, height, weight } = req.body;
        if(!name || !age || !dob || !aadharNumber || !fatherName || !motherName || !height || !weight)
        {
            return res.status(400).json({
                message: "Invalid request",
                info: "fill all the required details"
            });
        }
        const check = await prisma.child.findUnique({
            where: {
                aadharNumber: aadharNumber,
            }
        });
        if(check)
        {
            return res.status(400).json({
                message: "Already registered",
                child: req.body,
            });
        }
        await prisma.child.create({
            data: {
                name: name,
                age: age,
                dob: dob,
                aadharNumber: aadharNumber,
                fatherName: fatherName,
                motherName: motherName,
                teacherId: req.employeeId
            }
        });
        await prisma.childStats.create({
            data: {
                height: height,
                weight: weight,
                childId: aadharNumber
            }
        });
        console.log('successfully added');
        res.json({
            message: "successfully added"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "something went wrong.."
        });
    }
});

router.delete('/delete/:id', async function (req,res) {
    try {
        const childId = req.params.id;
        if(!childId || isNaN(childId))
        {
            return res.status(400).json({
                message: "Invalid request.."
            });
        }
        
        await prisma.child.delete({
            where: {
                aadharNumber: childId,
            }
        });

        await prisma.childStats.delete({
            where: {
                childId: childId,
            }
        });

        res.json({
            message: "deleted successfully..."
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong.."
        })
    }
});

module.exports = { childRouter : router}