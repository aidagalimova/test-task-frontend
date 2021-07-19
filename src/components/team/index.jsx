import React from "react";
import "./index.scss";

function Team({ name, logo, id }) {
    const redirect = () => {
         window.location = `/team/${id}`;
    }
    return (
        <div className="box" onClick={redirect}>
            <img className="logo" src={logo} />
            <h3 className="name"> {name} </h3>
        </div>
    )
}

export default Team;