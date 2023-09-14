import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OnBoard() {


    const navigate = useNavigate()


    useEffect( () => {

        const buzzrPlayer = JSON.parse( localStorage.getItem('buzzrplayer') )
        if ( buzzrPlayer ) {
            navigate('/game/' + buzzrPlayer.name + '/' + buzzrPlayer.sessionId)
        }

    } )


    return (
        <div id="on-board" className="page">

            <div id="buzzr-wrapper">
                <div id="buzzr-box">
                    <div id="buzzr" onClick={ () => navigate('/player') }>
                        <p id="buzzr-title">BUZZR</p>
                    </div>
                    <div id="buzzr-text">
                        <p id="buzzr-subtitle">Clique pour rejoindre une partie</p>
                    </div>
                </div>
            </div>

            <footer id="start-as-mj-link-wrapper">
                <Link to="mj" id="start-as-mj-link">Créer une partie en tant que Maître de Jeu</Link>
            </footer>

        </div>
    );
}

export default OnBoard