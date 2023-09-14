/* eslint-disable react/prop-types */
import { collection, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';

function BonusMalus(props) {

    const params = useParams()

    const changeBonus = async e => {
        const q = query( 
            collection(db, 'players'), 
            where('sessionId', '==', Number(params.sessionId)), 
            where('isMj', '==', true) 
        )
        const result = await getDocs(q)
        let mjId
        result.forEach( doc => {
            mjId = doc.id
        } )
        updateDoc( doc(db, 'players', mjId), { bonus: Number(e.target.value) } )
    }

    const changeMalus = async e => {
        const q = query( 
            collection(db, 'players'), 
            where('sessionId', '==', Number(params.sessionId)), 
            where('isMj', '==', true) 
        )
        const result = await getDocs(q)
        let mjId
        result.forEach( doc => {
            mjId = doc.id
        } )
        updateDoc( doc(db, 'players', mjId), { malus: Number(e.target.value) } )
    }

    return (
        <div id="bet-wrapper">
            <div id="bet">

                <p className="h1 header" id="bet-header">Points en jeu</p>

                <div className="body" id="bet-body">

                    <div className="bet-part" id="bonus">
                        <span className="bonus-title help">BONUS</span>
                        { props.isMj
                            ? <input type="number" step={5} defaultValue={props.bonus} onChange={changeBonus} /> 
                            : <span className="bet-value">{ props.bonus }</span>
                        }
                    </div>

                    <div className="bet-part" id="malus">
                        <span className="bonus-title help">MALUS</span>
                        { props.isMj
                            ? <input type="number" step={5} defaultValue={props.malus} onChange={changeMalus} /> 
                            : <span className="bet-value">{ props.malus }</span>
                        }
                    </div>

                </div>

            </div>

        </div>
    );
}

export default BonusMalus