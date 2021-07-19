import React from "react";
import "./index.scss";

function League({ name, logo, area, id, }) {
    const redirect = () => {
        window.location = `/competition/${id}`;
    }
    return (
        <div className="league" onClick={redirect}>
            <img className="img" src={logo} />
            <h3 className="name"> {name} </h3>
            <h3 className="info">Country: {area}</h3>
        </div>
    )
}

export default League;