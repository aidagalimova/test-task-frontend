import React from "react";
import "./index.scss";
import League from "../league";

function Leagues({ elements }) {
    const leagues = elements.map((el) => {
        return (<League
            key={el.league.id}
            name={el.league.name}
            logo={el.league.logo}
            area={el.country.name}
            id={el.league.id}
            />)
    })
    return (
        <>
            {leagues}
        </>
    )
}

export default Leagues;