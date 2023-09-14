/* eslint-disable react/prop-types */
import { IoCheckmark, IoClose } from 'react-icons/io5'
import { query, where, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function BuzztimeCard(props) {

    const setResult = async( result ) => {

        const q = query(collection(db, 'players'), where('sessionId', '==', props.player.sessionId), where('name', '==', props.player.name))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(snap => {
            const playerRef = doc(db, 'players', snap.id)

            if ( result === 'loser' ) {
                let newScore = (Number(snap.data().score) - Number(props.malus))
                if (newScore < 0) {
                    newScore = 0
                }

                updateDoc(playerRef, {
                    score: newScore.toString(),
                    roundResult: 'loser'
                })

            } else {
                updateDoc(playerRef, {
                    score: (Number(snap.data().score) + Number(props.bonus)).toString(),
                    roundResult: 'winner'
                })
            }
        })

    }

    return (
        <div className={`card buzzd-card ${props.player.roundResult}`}>
            
            <div className="card-header">
                <span className="h1 card-rank">{ Number(props.rank) +1 }</span>
            </div>

            <div className="card-content">
                <h3 className="card-name">{ props.player.name }</h3>
            </div>

            { props.isMj && props.gameStatus === 'resolve' &&
                <div className="card-footer">
                    <div className="card-footer-actions success" onClick={ () => setResult('winner') }>
                        <IoCheckmark />
                    </div>
                    <div className="card-footer-actions danger" onClick={ () => setResult('loser') }>
                        <IoClose />
                    </div>
                </div>
            }

        </div>
    );
}

export default BuzztimeCard