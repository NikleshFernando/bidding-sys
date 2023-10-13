import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/addBid.css'
export default function AddBid(){

    const [bids, setBids] = useState([]);
    const [currentBid, setCurrentBid] = useState(null);
    const [inputError, setInputError] = useState(null);
    const [value,setValue] = useState("");

    const userID = "user03"




    function getBids() {
        axios.get(`http://localhost:4042/Auction/get/${userID}`)
            .then((res) => {
                setBids(res.data);

                if (res.data && res.data.bidd) {
                    const bidValue = res.data.bidd.bidValue;
                    setCurrentBid(bidValue);
                } else {
                    setCurrentBid(0); 
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    getBids();

    const displayedBid = currentBid;

    const [bidValue,setBid] = useState("");

    function sendData(e){
        e.preventDefault();

        
        if (!isNaN(bidValue) && bidValue !== "" && parseInt(bidValue) >= 100) {
            const cooperateBid = parseInt(displayedBid) + parseInt(bidValue);

            const userId = "IT21806872";
            const itemId = "Item44";


            const newBid = {
                userId,
                bidValue: cooperateBid,
            }
            const bidHis = {
                userId,
                itemId,
                bidValue
            }

            axios.put(`http://localhost:4042/Auction/update/${itemId}`, newBid).then(() => {
                alert("Bid added");
                setBid(""); 
                setInputError(null); 
            }).catch((err) => {
                console(err)
            });
            axios.post("http://localhost:4042/BidHistory/add", bidHis).then(()=>{
                    console.log("Auction History Updated");
            }).catch((err)=>{
                    console(err)
            })
        } else {
            setInputError("Please enter a valid bid value above 100.");
        }
    }

    return (
        <div className="addBid">
            <form onSubmit={sendData}>
                <div className="inputText">
                    <label htmlFor="Place a bid" className="form-label">You can place a bid by adding a new value to the current value</label>
                    <input type="text" className={`form-control ${inputError ? 'is-invalid' : ''}`} id="bidValue" placeholder="Enter value to add" value={bidValue} onChange={(e) => {
                        setBid(e.target.value);
                        setInputError(null); 
                    }}></input>
                    {inputError && <div className="invalid-feedback">{inputError}</div>}
                </div>
                <div className="btn">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
          
        </div>
    )
}

