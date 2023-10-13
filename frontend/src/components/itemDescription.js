import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/itemDescription.css"; 

export default function ItemDescription() {

    const [address,setAddress] = useState("");
    const [street,setStreet] = useState("");
    const [city,setCity] = useState("");
    const [description,setDescription] = useState("");

    useEffect(() => {
        function getDes() {
            axios.get("http://localhost:4042/property/getproperty/6519c4e7b214eca80e95315f").then((res) => {
                console.log(res.data.property);
                setAddress(res.data.property.address);
                setStreet(res.data.property.street);
                setCity(res.data.property.city);
                setDescription(res.data.property.description);

                console.log(address);
                console.log(street);
                console.log(city);
                console.log(description);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getDes();
    }, []);

    return (
        <div className = "description">
            <h3>Description</h3>
            <hr/>
        <div className="description-container">
            
            <div className="description-detail">
                <h6 className="description-heading">Address:</h6>
                <p>{address}</p>
            </div>
            <div className="description-detail">
                <h6 className="description-heading">Street:</h6>
                <p>{street}</p>
            </div>
            <div className="description-detail">
                <h6 className="description-heading">City:</h6>
                <p>{city}</p>
            </div>
            <div className="description-detail">
                <h6 className="description-heading">Description:</h6>
                <p>{description}</p>
            </div>
        </div>
        </div>
    );
}
