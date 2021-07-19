import { Input, Form, Button, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import Leagues from "../../components/leagues";
import "./index.scss";
import { GetLeagues, GetLeaguesBySearchText, GetLeaguesBySeason, GetLeaguesByTextAndYear } from "../../services/leagues";
import { CheckOutlined } from '@ant-design/icons';

function LeaguesPage(props) {
    const [year, setYear] = useState('Select year');
    const [searchText, setSearchText] = useState('');
    const [leagues, setLeagues] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getLeagues() {
            if (props.match.params.year !== undefined) {
                setYear(props.match.params.year)
                if (props.match.params.searchText === undefined) {
                    setLeagues(await GetLeaguesBySeason(props.match.params.year));
                } else {
                    setSearchText(props.match.params.searchText);
                    setLeagues(await GetLeaguesByTextAndYear(props.match.params.searchText, props.match.params.year))
                }
            } else if (props.match.params.searchText !== undefined) {
                setSearchText(props.match.params.searchText)
                setLeagues(await GetLeaguesBySearchText(props.match.params.searchText));
            } else {
                setLeagues(await GetLeagues());
            }
            setIsLoaded(true);
        }
        getLeagues();
    }, []);

    const onSearchByText = e => {
        const { value } = e.target;
        setSearchText(value);
    }

    const searchByText = () => {
        if (props.match.params.year === undefined) {
            window.location = `/competitions/${searchText}`;
        } else {
            window.location = `/competitions/season/${props.match.params.year}/${searchText}`;
        }
    }
    
    const searchBySeason = (date, dateString) => {
        if (props.match.params.searchText === undefined) {
            window.location = `/competitions/season/${dateString}`;
        } else {
            window.location = `/competitions/season/${dateString}/${searchText}`;
        }
    }

    const showAll = () => {
        window.location = `/competitions`;
    }

    return (
        <div className="page">
            <h1 className="title">Leagues</h1>
            <div className="searchs">
                <h3 className="search-text">Search by league season:</h3>
                <DatePicker
                    picker="year"
                    onChange={searchBySeason}
                    placeholder={year}
                />
                <Button
                    onClick={showAll}
                    className="all-btn" >Show all</Button>
                <h3 className="search-text">Search by league name:</h3>
                <Form
                    className="search-form"
                    onFinish={searchByText}>
                    <Input
                        className="search"
                        value={searchText}
                        placeholder="Search..."
                        onChange={(e) => onSearchByText(e)}
                    />
                    <Button
                        className="btn"
                        htmlType="submit"> <CheckOutlined /></Button>
                </Form>
            </div>
            {isLoaded ?
                <div className="leagues-div">
                    {leagues.length !== 0 ?
                        <Leagues elements={leagues} /> :
                        <h1>Nothing was found</h1>}
                </div> :
                <div className="leagues-div"><h2>Loading...</h2></div>}
        </div>
    )
}

export default LeaguesPage;