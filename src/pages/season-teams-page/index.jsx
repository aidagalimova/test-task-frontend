import React, { useState, useEffect } from "react";
import Teams from "../../components/teams";
import { GetSeasonTeams, GetTeamsBySearchText } from "../../services/teams";
import "./index.scss";
import { Input, Form, Button} from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { GetLeagueById } from "../../services/leagues";

function SeasonTeams(props) {
    const [league, setLeague] = useState();
    const [teams, setTeams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        async function getLeagueInfoAndTeams() {
            setLeague(await GetLeagueById(props.match.params.id));
            setTeams(await GetSeasonTeams(props.match.params.id, props.match.params.year));
            if (props.match.params.searchText !== undefined) {
                setSearchText(props.match.params.searchText);
                setTeams(await GetTeamsBySearchText(props.match.params.searchText, props.match.params.id, props.match.params.year));
            } else {
                setTeams(await GetSeasonTeams(props.match.params.id, props.match.params.year));
            }
            setIsLoaded(true);
        }
        getLeagueInfoAndTeams();
    }, [])

    const searchByText = () => {
        window.location = `/competition/${props.match.params.id}/${props.match.params.year}/team/${searchText}`;
    }

    const onSearchByText = e => {
        const { value } = e.target;
        setSearchText(value);
    }

    const showAll = () => {
        window.location = `/competition/${props.match.params.id}/${props.match.params.year}/team`;
    }

    if (isLoaded) {
        return (
            <div className="page">
                <div className="teams-league-info">
                    <img className="logo" src={league.league.logo} />
                    <h2 className="name"> {league.league.name}.{"\xa0"} </h2>
                    <h2 className="info">{league.country.name}. </h2>
                </div>
                <h1 className="teams-title">Teams</h1>
                <div className="team-search">
                    <h3 className="search-text">Search by team name:</h3>
                    <Form
                        className="search-form"
                        onFinish={searchByText}>
                        <Input
                            placeholder="Search..."
                            className="search"
                            onChange={onSearchByText}
                            value={searchText}
                        />
                        <Button
                            className="btn"
                            htmlType="submit"> <CheckOutlined /></Button>
                    </Form>
                    <Button
                        className="all-btn"
                        onClick={showAll}>Show all</Button>
                </div>
                <div>
                    <Teams elements={teams} />
                </div>
            </div>)
    } else {
        return <div>Загрузка...</div>
    }
}

export default SeasonTeams;