const router = require("express").Router();
let Property = require("../models/Property");

router.route("/addproperty").post((req,res) =>{

    const address = req.body.address;
    const street = req.body.street;
    const city = req.body.city;
    const description = req.body.description;
    const value = req.body.value;
    const images = req.body.images;

    const newProperty = new Property({

        address,
        street,
        city,
        description,
        value,
        images,
    
    })

    newProperty.save().then(() => {
        res.json("Property Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/getproperties").get((req,res) => {

    Property.find().then((properties) =>{
        res.json(properties)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/updateproperty/:propertyid").put(async (req,res) => {
    let userID = req.params.propertyid;
    const { address,street,city,description,value,images,} = req.body;

    const updateProperty = {
        address,
        street,
        city,
        description,
        value,
        images,
    }

    const update = await Property.findByIdAndUpdate(userID, updateProperty)
    .then(() =>{
        res.status(200).send({status: "Property updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating property", error: err.message});
    })

})

router.route("/deleteproperty/:propertyid").delete(async (req,res) => {
    let userID = req.params.propertyid;

    await Property.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Property Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete property", error:err.message});
    })
})

router.route("/getproperty/:propertyid").get(async (req, res) => {
    try {
      const propertyId = req.params.propertyid;
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ status: "Property not found" });
      }
  
      res.status(200).json({ status: "Property Fetched", property: property });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: "Error with get property", error: err.message });
    }
  });
  
      
  

module.exports = router;

