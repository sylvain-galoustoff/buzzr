/* eslint-disable react/prop-types */
function RankingCard(props) {
    return (
        <div className="card">
            
            <div className="card-header">
                <span className="h1 card-rank">{ Number(props.rank) +1 }</span>
            </div>

            <div className="card-content">
                <p className="card-name">{ props.player.name }</p>
                <p className="card-points">
                    <span className="card-points-value help">{ props.player.score } </span>
                    <span className="help">points</span>
                </p>
            </div>

        </div>
    );
}

export default RankingCard