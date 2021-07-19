import api from "../axios/api";

export async function GetLeagues() {
  const apiUrl = "/leagues";
  const options = {
    params: {
      type: "league"
    }
  }
  const resp = await api.get(apiUrl, options);
  const leagues = resp.data.response;
  return leagues;
};

export async function GetLeaguesBySeason(year) {
  const apiUrl = "/leagues";
  const options = {
    params: {
      season: year,
      type: "league"
    }
  }
  const resp = await api.get(apiUrl, options);
  const leagues = resp.data.response;
  return leagues;
};

export async function GetLeaguesBySearchText(text) {
  const leagues = (await GetLeagues()).filter((league) => {
    return league.league.name.toLowerCase().includes(text.toLowerCase());
  })
  return leagues;
}

export async function GetLeagueById(id) {
  const apiUrl = "/leagues";
  const options = {
    params: {
      id: id
    }
  }
  const resp = await api.get(apiUrl, options);
  const league = resp.data.response[0];
  league.seasons = league.seasons.reverse();
  return league;
}
export async function GetLeaguesByTextAndYear(text, year) {
  const leagues = (await GetLeaguesBySeason(year)).filter((league) => {
    return league.league.name.toLowerCase().includes(text.toLowerCase());
  })
  return leagues;
}

export async function GetLeagueSeasonByYear(id, year) {
  const league = (await GetLeagueById(id))
  league.seasons = league.seasons.filter((season) => {
    return season.year.toString() === year.toString();
  });
  return league;
}

export async function GetLeagueSeasonByYearRange(id, startYear, endYear) {
  const league = (await GetLeagueById(id))
  league.seasons = league.seasons.filter((season) => {
    return startYear <= parseInt(season.year) && parseInt(season.year) <= parseInt(endYear);
  });
  return league;
}