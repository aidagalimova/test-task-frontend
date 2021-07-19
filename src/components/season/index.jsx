import React from "react";
import "./index.scss";
function Season({ season, number, leagueId }) {

    const redirect = () => {
        window.location = `/competition/${leagueId}/${season.year}/team`;
    }
    return (
        <div className="season" onClick={redirect}>
            <h3 className="date">
                {number}.{"\xa0"} {season.start.replaceAll("-", ".")}{" - "}{season.end.replaceAll("-", ".")}
            </h3>
        </div>
    )
}

export default Season;