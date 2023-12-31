const router = require("express").Router();
let Vehicle = require("../models/Vehicle");

const multer = require('multer');
const mime = require('mime-types'); // Use mime-types

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/addvehicle").post(upload.array('images', 10), async (req, res) => {
  const vehicleNumber = req.body.vehicleNumber;
  const year = req.body.year;
  const model = req.body.model;
  const fuelType = req.body.fuelType;
  const mileage = req.body.mileage;
  const features = req.body.features;
  const location = req.body.location;
  const value = req.body.value;
  const images = req.files;

  try {
    const newImages = images.map((image) => ({
      name: image.originalname,
      dataUrl: `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
    }));

    const newVehicle = new Vehicle({
      vehicleNumber,
      year,
      model,
      fuelType,
      mileage,
      features,
      location,
      value,
      images: newImages,
    });

    await newVehicle.save();
    res.json("Vehicle Added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

       
router.route("/getvehicles").get((req,res) => {

    Vehicle.find().then((vehicles) =>{
        res.json(vehicles)
    }).catch((err) =>{
        console.log(err) 

    })
           

})

router.route("/updatevehicle/:vehicleid").put(async (req,res) => {
    let vehicleID = req.params.vehicleid;
    const {vehicleNumber,year,model,fuelType,mileage,features,location,value,images} = req.body;

    const vehicleUpdate = {
        vehicleNumber,
        year,
        model,
        fuelType,
        mileage,
        features,
        location,
        value,
        images
    }

    const updatevehicle = await Vehicle.findByIdAndUpdate(vehicleID, vehicleUpdate)
    .then(() =>{
        res.status(200).send({status: "Vehicle updated"})   
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})

router.route("/deletevehicle/:vehicleid").delete(async (req,res) => {
    let userID = req.params.vehicleid;

    await Vehicle.findByIdAndDelete(userID)
    .then(() => {
        res.status(200).send({status: "Vehicle Deleted"});  
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete vehicle", error:err.message});
    })
})

router.route("/getvehicle/:vehicleid").get(async(req,res) => {
    let userID = req.params.vehicleid;
    await Vehicle.findById(userID)
    .then((Vehicle) => {
        res.status(200).send({status: "Vehicle fetched", Vehicle})   
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get vehicle", error:err.message});

    })
})

module.exports = router;
