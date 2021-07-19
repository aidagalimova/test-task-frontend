import React from "react";
import "./index.scss";
import Team from "../team";

function Teams({ elements }) {
    const teams = elements.map((el) => {
        return (<Team
            key={el.team.id}
            name={el.team.name}
            logo={el.team.logo}
            id={el.team.id} />)
    })
    return (
        <div className="teams-box">
            {teams}
        </div>
    )
}

export default Teams;