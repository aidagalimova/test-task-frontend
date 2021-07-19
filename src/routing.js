import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LeaguesPage from "./pages/leagues-page";
import LeaguePage from "./pages/league-page";
import SeasonTeams from "./pages/season-teams-page";
import TeamPage from "./pages/team-page";

const Routing = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/competitions/season/:year/:searchText" component={LeaguesPage} exact />
                    <Route path="/competitions/season/:year" component={LeaguesPage} exact />
                    <Route path="/competitions/:searchText" component={LeaguesPage} exact />
                    <Route path="/competitions" component={LeaguesPage} exact />

                    <Route path="/competition/:id/:year/team/:searchText" component={SeasonTeams} exact />
                    <Route path="/competition/:id/:year/team" component={SeasonTeams} exact />

                    <Route path="/competition/:id/range/:startYear/:endYear" component={LeaguePage} exact />
                    <Route path="/competition/:id/:year" component={LeaguePage} exact />
                    <Route path="/competition/:id" component={LeaguePage} exact />
                   
                    <Route path="/team/:id/range/:startYear/:endYear" component={TeamPage} exact />
                    <Route path="/team/:id/:year" component={TeamPage} exact />
                    <Route path="/team/:id" component={TeamPage} exact />
                </Switch>
            </Router>
        </div>
    )
};

export default Routing;
