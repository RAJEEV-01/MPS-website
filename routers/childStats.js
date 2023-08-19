const router = require('express').Router();
const prisma = require('../helpers/prisma');

router.post('/add', async function (req,res) {
    try {
        const { height, weight, childId } = req.body;
        if(!height || !weight || !childId)
        {
            return req.status(400).json({
                message: "Invalid request.."
            });
        }
        const childStats = await prisma.childStats.create({
            data: {
                height: height,
                weight: weight,
                childId: childId
            }
        });
        console.log("successfully added..");
        res.json({
            message: "successfully added"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong.."
        });
    }
});

router.get('/get/:id', async function(req,res) {
    try {
        const childId = req.params.id;
        if(isNaN(childId))
        {
            return res.status(400).json({
                message: "Invalid request"
            });
        }
        const childStats = await prisma.childStats.findMany({
            where: {
                childId: childId
            },
            select: {
                height: true,
                weight: true,
                timeStamp: true
            }
        });
        res.json(childStats);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong..."
        })
    }
});

module.exports = { childStatsRouter: router}