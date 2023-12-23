import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import Clock from "./Clock";

function UserDetail() {
    const Navigate = useNavigate("");
    const { postData, userData } = useLocation().state;
    console.log(userData);

    return (
        <div className="container">
            <div className="upper_card">
                <div className="button">
                    <button onClick={() => Navigate("/")}>Go Back</button>
                </div>
                <div className="clockSection">
                <Clock />
                </div>
            </div>
            <div className="data_card">
                {postData.map((item, index) => {
                    return (
                        <div key={index} className="display_card">
                            <div className="heading">{item.title}</div>
                            <p>{item.body}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserDetail;
