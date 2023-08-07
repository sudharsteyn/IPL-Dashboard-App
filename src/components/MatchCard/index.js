import './index.css'

const MatchCard = props => {
  const {matchDetail} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = matchDetail
  return (
    <li>
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
