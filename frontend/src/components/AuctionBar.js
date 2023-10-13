import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllBids from './AllBids';
import TimerCountdown from './TimerCountdown';
import './css/AuctionBar.css'

import { AiOutlineComment } from "react-icons/ai";
function AuctionBar () {

  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate('/add');
  };

   
  return (
    <div className= "AuctionBar">
    <div className="bar">
      <div className="time">
        <TimerCountdown seconds = {3000}/>
      </div>
      <div className="highest-bid">
        <AllBids/>
      </div>
      <div className = "cmnt">
        <h3><AiOutlineComment/> Comments</h3>
      </div>
    </div>
      <div className = 'btn'>
        <button type = "submit" class = "btn btn-primary" onClick={handleClick}>Place bid</button>
      </div>
      <div>
      </div>
    </div>
    
  );
};

export default AuctionBar;
