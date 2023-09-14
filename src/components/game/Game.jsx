import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

import Bet from './Bet'
import MjBuzzr from "./MjBuzzr";
import PlayerBuzzr from "./PlayerBuzzr";
import RankingCard from './RankingCard';
import BuzztimeCard from './BuzztimeCard';
import GameFooter from './GameFooter';

function Game() {


    const [players, setPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [mj, setMj] = useState({})
    const [isMj, setIsMj] = useState(false)


    const params = useParams()
    const navigate = useNavigate()


    useEffect( () => {

        const buzzrPlayer = JSON.parse( localStorage.getItem('buzzrplayer') )

        if ( !buzzrPlayer ) {
            navigate('/')
        }
        
        const fetchData = () => {

            const q = query( collection(db, 'players'), where('sessionId', '==', Number( params.sessionId )) )
            onSnapshot(q, querySnapshot => {

                let playersList = []
                let getMj

                querySnapshot.forEach( doc => {

                    if (doc.data().isMj === true) {

                        getMj = doc.data()
                        if ( doc.data().name === params.name ) {
                            setPlayer( doc.data() )
                        }

                    } else {

                        if ( doc.data().name === params.name ) {
                            setPlayer( doc.data() )
                        }
                        playersList.push( doc.data() )

                    }
                } )
                setPlayers( playersList );

                if ( getMj ) {
                    setMj( getMj )
                } else {
                    setMj({ name: '' })
                }

            })
             
        }
        
        fetchData()
        setPlayer( buzzrPlayer )

        if ( params.name === mj.name ) {
            setIsMj(true)
        }

    }, [navigate, params.sessionId, params.name, mj.name] )


    const ranking = () => {
        const mjName = mj.name
        let orderRanking = [...players]

        orderRanking =  orderRanking.filter(i => i.name !== mjName)
        orderRanking.sort( function(a, b) {
            return b.score - a.score
        } )
        return Object.keys(orderRanking).map(key => <RankingCard key={key} rank={key} player={orderRanking[key]} />)
    }


    const buzztime = () => {
        let orderBuzzd = [...players]

        orderBuzzd = orderBuzzd.filter(i => i.buzzd === true)
        orderBuzzd.sort( function(a, b) {
            return a.buzztime - b.buzztime
        } )
        return Object.keys(orderBuzzd).map(key => 
            <BuzztimeCard 
                key={key} 
                rank={key} 
                player={orderBuzzd[key]} 
                isMj={ isMj } 
                bonus={mj.bonus} 
                malus={mj.malus}
                gameStatus={mj.gameStatus}
            />
        )
    }


    return (
        <div id="game" className="page">

            <div id="gaming-zone">

                <div className="part" id="ranking">
                    <p className="h1 header" id="ranking-header">Classement</p>
                    <div className="part-content">
                        { players && ranking() }
                    </div>
                </div>

                <div className="part" id="buzzr-part">

                    <Bet isMj={isMj} bonus={mj.bonus} malus={mj.malus} />
                    
                    { isMj
                        ? <MjBuzzr gameStatus={ mj.gameStatus } sessionId={ mj.sessionId } /> 
                        : <PlayerBuzzr gameStatus={ mj.gameStatus } sessionId={ mj.sessionId } playerName={ player.name } /> 
                    }

                </div>

                <div className="part" id="buzztime">
                    <p className="h1 header" id="ranking-header">Buzztime</p>
                    <div className="part-content">
                        { players && buzztime() }
                    </div>
                </div>

            </div>

            <GameFooter player={player} isMj={isMj} />

        </div>
    );
}

export default Game