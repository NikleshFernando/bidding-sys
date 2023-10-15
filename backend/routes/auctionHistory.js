const router = require("express").Router();
const mongoose = require("mongoose");
let AuctionHistory = require("../models/AuctionHistory");

router.route("/add").post((req,res)=>{

    const itemId = req.body.itemId;
    const bidValue = parseInt(req.body.bidValue,10);
    const userId = req.body.userId;

    const newAuction = new AuctionHistory({
        itemId,
        userId,
        bidValue,
    })

    newAuction.save().then(()=>{
        res.json("Bidd added to Bidd History Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/").get((req,res)=>{
    AuctionHistory.find().then((auctions)=>{
        res.json(auctions)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/get/:userId").get(async (req, res) => {
    const userId = req.params.userId;
    try {
        const bid = await AuctionHistory.findOne({ userId: userId });
        if (bid) {
            res.status(200).json({ status: "Bid History fetched", bid });
        } else {
            res.status(404).json({ status: "Bid not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with get user", error: err.message });
    }
});

module.exports = router;