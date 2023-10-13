import React, { useState, useEffect } from "react";
import axios from 'axios';
import './css/AllBids.css'
import { BsArrowUp } from "react-icons/bs"

export default function AllBids() {
    const [bids, setBids] = useState([]);
    const [currentBid, setCurrentBid] = useState(null); 

    useEffect(() => {
        function getBids() {
            axios.get("http://localhost:4042/Auction/get/IT21809224")
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

        const refreshInterval = setInterval(getBids, 100);

        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    return (
        <div className="container">
            <div>
                <h2><BsArrowUp/> Current Bid : ${currentBid !== null ? currentBid : "Loading..."}</h2>
            </div>
        </div>
    );
}
