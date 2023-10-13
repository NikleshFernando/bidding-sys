import React ,{Usestate,useEffect, useState}  from "react";
import axios from 'axios';

export default function AuctionHistory(){
    const [auctions,setAuctions] = useState([]);

    useEffect(()=>{
        function getAuctionHis(){
        axios.get("http://localhost:4042/BidHistory/").then((res)=>{
            setAuctions(res.data);
            console.log(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    getAuctionHis();
    },[]);

    return (
        <div className="container">
            <h1>Auction History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>User ID</th>
                        <th>Bid Value</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction) => (
                        <tr key={auction.id}>
                            <td>{auction.itemId}</td>
                            <td>{auction.userId}</td>
                            <td>{auction.bidValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
