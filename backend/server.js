const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4042;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Successfully!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

app.use(express.json({ limit: "20mb" }));

const auctionRouter = require("./routes/Auction.js");
app.use("/Auction", auctionRouter);

const commentRouter = require("./routes/comments.js");
app.use("/LiveComments", commentRouter);

const auctionHistoryRouter = require("./routes/auctionHistory.js")
app.use("/BidHistory",auctionHistoryRouter);


const vehicleRouter = require("./routes/vehicles.js");
const artRouter = require("./routes/arts.js");
const propertyRouter = require("./routes/properties.js");
const collectableRouter = require("./routes/collectables.js")

app.use("/vehicle",vehicleRouter)
app.use("/art",artRouter)
app.use("/property",propertyRouter)
app.use("/collectable",collectableRouter)






