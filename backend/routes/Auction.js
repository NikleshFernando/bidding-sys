
const router = require("express").Router();
const mongoose = require("mongoose");
let Auction = require("../models/auction");

router.route("/add").post((req,res)=>{

    const itemId = req.body.itemId;
    const bidValue = parseInt(req.body.bidValue,10);
    const userId = req.body.userId;

    const newAuction = new Auction({
        itemId,
        userId,
        bidValue,
    })

    newAuction.save().then(()=>{
        res.json("Bidded Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/get/:Id").get(async (req,res)=>{
    let itemId = req.params.itemId;
    const bid = await Auction.findOne(itemId).then((bidd)=>{
        res.status(200).send({status : "Bid fetched",bidd})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message})
    })
})

router.route("/").get((req,res)=>{
    Auction.find().then((auctions)=>{
        res.json(auctions)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route('/update/:itemId').put(async (req, res) => {
    try {
        let itemId = req.params.itemId;
        const { bidValue } = req.body;

        const updateBid = {
            bidValue
        }

        const update = await Auction.findOneAndUpdate({ itemId: itemId }, updateBid);
        res.status(200).send({ status: "Bid Updated", Bid: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Bid", error: err.message });
    }
})


    
module.exports = router;