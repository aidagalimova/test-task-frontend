import { Divider } from "antd";
import React from "react";
import Season from "../season";
import "./index.scss";
function Seasons({ elements, leagueId }) {
    let number = 0;
    const seasons = elements.map((el) => {
        number++;
        return (
            <>
                <Divider />
                <Season
                    key={number}
                    season={el}
                    number={number}
                    leagueId={leagueId} />
            </>)
    })
    return (
        <div className="seasons">
            {seasons.length !== 0 ?
                <>
                    <h2 className="seasons-title">Seasons</h2>
                    {seasons}
                </> :
                <h2>Nothing was found</h2>
            }
        </div>
    )
}

export default Seasons;