/* eslint-disable react/prop-types */
import { IoExit, IoReload } from 'react-icons/io5';
import { query, where, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';

function GameFooter(props) {


    const params = useParams()
    const navigate = useNavigate()


    const resetGame = async() => {
        const q = query(
            collection(db, 'players'),
            where('sessionId', '==', Number(params.sessionId))
        )
        const result = await getDocs(q)
        result.forEach(snap => {
            const playerRef = doc(db, 'players', snap.id)
            updateDoc(playerRef, {
                score: 0,
                buzzd: false,
                buzztime: 0
            })
        })
    }


    const quitGame = async() => {

        const q = query( 
            collection(db, 'players'), 
            where('name', '==', props.player.name),
            where('sessionId', '==', Number(params.sessionId)) 
        )

        const result = await getDocs(q)
        const playerId = result.docs[0].id
        deleteDoc(doc(db, 'players', playerId))
        localStorage.removeItem('buzzrplayer')
        navigate('/')

    }


    const destroyGame = async() => {

        const q = query( 
            collection(db, 'players'),
            where('sessionId', '==', Number(params.sessionId)) 
        )

        const result = await getDocs(q)
        result.forEach( player => {
            deleteDoc( doc(db, 'players', player.id) )
        })
        localStorage.removeItem('buzzrplayer')
        navigate('/')

    }


    return (
        <footer id="game-footer">

            <div className='footer-part' id="footer-left">
                <p id="player-name">
                    Joueur : <span id="player-name-value">{ props.player.name } { props.isMj && '(MJ)' }</span>
                </p>

                <p id="footer-session-number">
                    Session : <span id="session-number-value">{ props.player.sessionId }</span>
                </p>
            </div>

            <div className="footer-part" id="footer-right">
                {props.isMj && 
                    <span id="reset-game" onClick={ resetGame }>
                        Reset game <IoReload />
                    </span>
                }
                <span id="stop-game" onClick={ props.isMj === true ? destroyGame : quitGame }>
                    { props.isMj === true ? 'Détruire la session' : 'Quitter la partie' } <IoExit id="quit-game" />
                </span>
            </div>

        </footer>
    );
}

export default GameFooter