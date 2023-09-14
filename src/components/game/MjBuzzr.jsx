/* eslint-disable react/prop-types */
import { IoEllipsisHorizontal, IoHelp, IoPause } from 'react-icons/io5';
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


function MjBuzzr(props) {


    const changeGameStatus = async() => {

        const currentStatus = props.gameStatus
        const status = ['wait', 'play', 'resolve']
        let nextStatus = status.indexOf(currentStatus) +1
        if (nextStatus === 3) {
            nextStatus = 0
        }

        if ( currentStatus === 'resolve' ) {
            const q = query( collection(db, "players"), where("sessionId", '==', props.sessionId), where('isMj', "==", false) )
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(snap => {
                const playerRef = doc(db, 'players', snap.id)
                updateDoc(playerRef, {
                    gameStatus: status[nextStatus],
                    buzztime: 0,
                    buzzd: false,
                    roundResult: 'undefined',
                })
            })

        }

        const q = query( collection(db, "players"), where("sessionId", '==', props.sessionId), where('isMj', "==", true) )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(snap => {
            const playerRef = doc(db, 'players', snap.id)
            updateDoc(playerRef, {
                gameStatus: status[nextStatus]
            })
        })

    }


    const buzzrStatus = () => {

        const gameStatus = props.gameStatus
        let buzzrStatus

        switch (gameStatus) {
            case 'wait':
                buzzrStatus = {
                    icon: <IoPause className='buzzr-icon frame-in' id="pause"/>,
                    status: "Préparation",
                    message: "Les joueurs attendent ta question",
                    cursor: "cursor-pointer"
                }
                break;
        
            case 'play':
                buzzrStatus = {
                    icon: <IoHelp className='buzzr-icon frame-in' id="help"/>,
                    status: "Jeu en cours !",
                    message: "Les joueurs buzzent",
                    cursor: "cursor-pointer",
                }
                break;
        
            case 'resolve':
                buzzrStatus = {
                    icon : <IoEllipsisHorizontal className='buzzr-icon frame-in' id="ellipsis"/>,
                    status: "Jeu en pause",
                    message: "Distribuez les points",
                    cursor: "cursor-pointer"
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

                <div id="buzzr" className={ buzzrStatus().cursor } onClick={ changeGameStatus }>
                    <p id="buzzr-icon">
                        { buzzrStatus().icon }
                    </p>
                </div>

                <div id="buzzr-text">
                    <p id="buzzr-subtitle">{ buzzrStatus().status }</p>
                    <p className='frame-in help' id="buzzr-help">{ buzzrStatus().message }</p>
                </div>

            </div>
        </div>
    );
}

export default MjBuzzr