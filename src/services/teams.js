import api from "../axios/api";

export async function GetSeasonTeams(leagueId, seasonYear) {
  const apiUrl = "/teams";
  const options = {
    params: {
      league: leagueId,
      season: seasonYear
    }
  }
  const resp = await api.get(apiUrl, options);
  const teams = resp.data.response;
  return teams;
};

export async function GetTeamsBySearchText(text, leagueId, leagueYear) {
  const teams = (await GetSeasonTeams(leagueId, leagueYear)).filter((team) => {
    return team.team.name.toLowerCase().includes(text.toLowerCase());
  })
  return teams;
}

export async function GetTeamById(id) {
  const apiUrl = "/teams";
  const options = {
    params: {
      id: id
    }
  }
  const resp = await api.get(apiUrl, options);
  const team = resp.data.response;
  return team[0];
};

export async function GetTeamFixtures(id, year) {
  const apiUrl = "/fixtures";
  const options = {
    params: {
      season: year,
      team: id
    }
  };
  const resp = await api.get(apiUrl, options);
  const fixtures = resp.data.response;
  return fixtures;
}