import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  constructor(props) {
    super(props)
    const {match} = props
    const {params} = match
    const {id} = params
    this.state = {
      teamBanner: '',
      latestMatchDetails: {},
      recentMatches: [],
      teamId: id,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  convertToCamelCase = matchDetail => ({
    competingTeam: matchDetail.competing_team,
    competingTeamLogo: matchDetail.competing_team_logo,
    date: matchDetail.date,
    firstInnings: matchDetail.first_innings,
    id: matchDetail.id,
    manOfTheMatch: matchDetail.man_of_the_match,
    matchStatus: matchDetail.match_status,
    result: matchDetail.result,
    secondInnings: matchDetail.second_innings,
    umpires: matchDetail.umpires,
    venue: matchDetail.venue,
  })

  getTeamDetails = async () => {
    const {teamId} = this.state
    const response = await fetch(`https://apis.ccbp.in/ipl/${teamId}`)
    const teamDetails = await response.json()
    const lastMatchDetail = teamDetails.latest_match_details
    const updatedLastMatchDetail = this.convertToCamelCase(lastMatchDetail)
    const updatedRecentMatches = teamDetails.recent_matches.map(eachMatch =>
      this.convertToCamelCase(eachMatch),
    )
    this.setState({
      teamBanner: teamDetails.team_banner_url,
      latestMatchDetails: updatedLastMatchDetail,
      recentMatches: updatedRecentMatches,
      isLoading: false,
    })
    console.log(teamDetails)
  }

  render() {
    const {
      teamBanner,
      teamId,
      isLoading,
      latestMatchDetails,
      recentMatches,
    } = this.state
    console.log(teamId)
    return (
      <div className={`team-match-details ${teamId}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div>
            <img className="team-banner" src={teamBanner} alt="team banner" />
            <p className="latest-match-title">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul>
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchDetail={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
