import { Button, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Seasons from "../../components/seasons";
import { GetLeagueById, GetLeagueSeasonByYear, GetLeagueSeasonByYearRange } from "../../services/leagues";
import "./index.scss";

const { RangePicker } = DatePicker;

function LeaguePage(props) {

    const [league, setLeague] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [year, setYear] = useState('Select year');
    const [yearRange, setYearRange] = useState(["Start year", "End year"]);

    useEffect(() => {
        async function getLeague() {
            if (props.match.params.year !== undefined) {
                setYear(props.match.params.year);
                setLeague(await GetLeagueSeasonByYear(props.match.params.id, props.match.params.year))
            } else if (props.match.params.startYear !== undefined) {
                setYearRange([props.match.params.startYear, props.match.params.endYear]);
                setLeague(await GetLeagueSeasonByYearRange(props.match.params.id, props.match.params.startYear, props.match.params.endYear))
            } else {
                setLeague((await GetLeagueById(props.match.params.id)));
            }
            setIsLoaded(true);
        }
        getLeague();
    }, [])

    const onYearChange = (date, dateString) => {
        window.location = `/competition/${props.match.params.id}/${dateString}`;
    }

    const onYearRangeChange = (date, dateString) => {
        window.location = `/competition/${props.match.params.id}/range/${dateString[0]}/${dateString[1]}`
    }

    const showAll = () => {
        window.location = `/competition/${props.match.params.id}`;
    }

    if (isLoaded) {
        return (
            <div className="page">
                <div className="league-info">
                    <img className="logo" src={league.league.logo} />
                    <h2 className="name"> {league.league.name}.{"\xa0"} </h2>
                    <h2 className="info">{league.country.name}. </h2>
                </div>
                <DatePicker
                    placeholder={year}
                    className="year-picker"
                    onChange={onYearChange}
                    picker="year" />
                <RangePicker
                    onChange={onYearRangeChange}
                    picker="year"
                    placeholder={[yearRange[0], yearRange[1]]} />
                <Button
                    className="all-btn"
                    onClick={showAll}>Show all</Button>
                <Seasons
                    elements={league.seasons}
                    leagueId={league.league.id} />
            </div>)
    } else {
        return (<div>Загрузка...</div>)
    }
}

export default LeaguePage;