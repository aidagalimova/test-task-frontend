import { DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import "./index.scss";
import { GetTeamById, GetTeamFixtures } from "../../services/teams";

const { RangePicker } = DatePicker;

function TeamPage(props) {

    const [team, setTeam] = useState();
    const [fixtures, setFixtures] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [year, setYear] = useState('Select year');
    const [yearRange, setYearRange] = useState(["Start year", "End year"]);

    useEffect(() => {
        async function getLeague() {
            if (props.match.params.year !== undefined) {
                setFixtures(await GetTeamFixtures(props.match.params.id, props.match.params.year));
            } else if (props.match.params.startYear !== undefined) {

            }
            setTeam(await GetTeamById(props.match.params.id));
            setIsLoaded(true);
        }
        getLeague();
        console.log(1, fixtures);
    }, [])

    const onYearChange = (date, dateString) => {
        window.location = `/team/${props.match.params.id}/${dateString}`;
    }

    const onYearRangeChange = (date, dateString) => {
        window.location = `/team/${props.match.params.id}/range/${dateString[0]}/${dateString[1]}`
    }
    if (isLoaded) {
        return (
            <div className="page">
                <div className="team-info">
                    <img className="logo" src={team.team.logo} />
                    <h1 className="name"> {team.team.name}.{"\xa0"} </h1>
                    <h2 className="info">{team.team.country}. </h2>
                </div>
                <div className="searchs">
                    <h3 className="search-text">Select a year to see the matches of the team </h3>
                    <DatePicker
                        placeholder={year}
                        className="year-picker"
                        onChange={onYearChange}
                        picker="year" />
                    <RangePicker
                        onChange={onYearRangeChange}
                        placeholder={[yearRange[0], yearRange[1]]}
                        picker="year" />
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default TeamPage;