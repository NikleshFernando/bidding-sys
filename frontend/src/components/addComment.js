import React, {useState, useEffect}from "react";
import axios from "axios";
import "./css/addComment.css";

function AddComment(){

    
    const [Comment,setComment] = useState("");
    const userId = "Niklesh";
    const itemId = "item02";

    function sendComments(e){
        e.preventDefault();

        const newComment = {
            userId,
            itemId,
            Comment
        }
        axios.post("http://localhost:4042/LiveComments/add",newComment).then(()=>{
            alert("Comment posted");
            setComment("");
        }).catch((err)=>{
            alert(err);
        })
    }


    return(
        <div className = "liveComments">
            <h3 className = "description-Heading">Live Comments</h3>
            <hr/>
        <div className = "cmtPrompt">
            
            <form onSubmit={sendComments}>
                <input type = "text" placeholder='Enter your Comment'onChange={(e)=>{
                    setComment(e.target.value);
                }}></input>
                <button type = "submit">Post</button>
            </form>
        </div>
        </div>
    );
}

export default AddComment;