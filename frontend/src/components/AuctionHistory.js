import React ,{useEffect, useState, useRef}  from "react";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";

export default function AuctionHistory(){
    const [auctions,setAuctions] = useState([]);

    const componentPDF = useRef()

    const userID = "IT21806872";

    useEffect(()=>{
        function getAuctionHis(){
        axios.get(`http://localhost:4042/BidHistory/get/${userID}`).then((res)=>{
            setAuctions(res.data);
            console.log(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    getAuctionHis();
    },[]);
    const generatePDF  = useReactToPrint({
        content: ()=> componentPDF.current,
        documentTitle:"Auction History",
        onAfterPrint:()=>alert("Data Saved in PDF")
    });

    return (
        <div className="container">
            <h1>Auction History</h1>
            <div ref={componentPDF} style = {{width: '100%'}}>
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
            <div>
                <button className = "btn btn-primary" onClick = {generatePDF}>Print</button>
            </div>
        </div>
    )
}
