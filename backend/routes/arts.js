const router = require("express").Router();
let Art = require("../models/Art");

router.route("/addart").post((req,res) =>{

    const title = req.body.title;
    const medium = req.body.medium;
    const height = req.body.height;
    const width = req.body.width;
    const condition = req.body.condition;
    const location = req.body.location;
    const value = req.body.value;
    const images = req.body.images;

    const newArt = new Art({

        title,
        medium,
        height,
        width,
        condition,
        location,
        value,
        images,
    })

    newArt.save().then(() => {
        res.json("Art Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/getarts").get((req,res) => {

    Art.find().then((arts) =>{
        res.json(arts)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

// fetch data route
router.route("/getarts/:artid").get(async (req, res) => {
    let userId = req.params.artid;
    await Art.findById(userId)
      .then((Art) => {
        res.status(200).send({ status: "Art details fetched", Art });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({
            status: "Error with getting Payment details",
            error: err.message,
          });
      });
  });

router.route("/updateart/:artid").put(async (req,res) => {
    let userID = req.params.artid;
    const {title,medium,height,width,condition,location,value,images} = req.body;

    const updateArt = {
        title,
        medium,
        height,
        width,
        condition,
        location,
        value,
        images
    }

    const updateart = await Art.findByIdAndUpdate(userID, updateArt)
    .then(() =>{
        res.status(200).send({status: "Art updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating art", error: err.message});
    })

})

router.route("/deleteart/:artid").delete(async (req,res) => {
    let userID = req.params.artid;

    await Art.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Art Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete art", error:err.message});
    })
})

router.route("/getart/:artid").get(async(req,res) => {
    let userID = req.params.artid;
    await Art.findById(userID)
    .then((Art) => {
        res.status(200).send({status: "Art fetched", Art})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get art", error:err.message});

    })
})

module.exports = router;

