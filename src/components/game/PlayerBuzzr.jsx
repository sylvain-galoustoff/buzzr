import { IoEllipsisHorizontal, IoHelp, IoPause } from 'react-icons/io5';
import { collection, doc, getDocs, query, where, updateDoc, serverTimestamp  } from 'firebase/firestore';
import { db } from '../../firebase';


function PlayerBuzzr(props) {


    const buzzd = async() => {
        
        const q = query(collection(db, 'players'), where('sessionId', '==', props.sessionId), where('name', '==', props.playerName))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(snap => {
            const playerRef = doc(db, 'players', snap.id)
            if (snap.data().buzzd === false) {
                updateDoc(playerRef, {
                    buzzd: true,
                    buzztime: serverTimestamp ()
                })
            }
        })

    }


    const buzzrStatus = () => {

        const gameStatus = props.gameStatus
        let buzzrStatus

        switch (gameStatus) {
            case 'wait':
                buzzrStatus = {
                    icon: <IoPause className='buzzr-icon frame-in' id="pause"/>,
                    status: "Patientez",
                    message: "Le Maître de jeu prépare sa question",
                    cursor: "cursor-not-allowed"
                }
                break;
        
            case 'play':
                buzzrStatus = {
                    icon: <IoHelp className='buzzr-icon frame-in' id="help"/>,
                    status: "Jeu en cours !",
                    message: "Buzz si tu as la réponse",
                    cursor: "cursor-pointer",
                }
                break;
        
            case 'resolve':
                buzzrStatus = {
                    icon : <IoEllipsisHorizontal className='buzzr-icon frame-in' id="ellipsis"/>,
                    status: "Jeu en pause",
                    message: "Le Maître de jeu distribue les points",
                    cursor: "cursor-not-allowed"
                }
                break;
        
            default:
                buzzrStatus = <IoPause className='buzzr-icon frame-in' id="pause"/>
                break;
        }

        return buzzrStatus
    }


    return (
        <div id="buzzr-wrapper">
            <div id="buzzr-box">

                <div id="buzzr" className={ buzzrStatus().cursor } onClick={ props.gameStatus === 'play' ? buzzd : undefined }>
                    <p id="buzzr-icon">{ buzzrStatus().icon }</p>
                </div>
                
                <div id="buzzr-text">
                    <p className='frame-in' id="buzzr-subtitle">{ buzzrStatus().status }</p>
                    <p className='frame-in help' id="buzzr-help">{ buzzrStatus().message }</p>
                </div>

            </div>
        </div>
    );

}

export default PlayerBuzzr