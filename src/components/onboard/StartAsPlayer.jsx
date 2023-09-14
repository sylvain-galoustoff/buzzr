import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function StartAsPlayer() {


    const [form, setForm] = useState({
        name: '',
        sessionId: null,
        isMj: false,
        score: 0,
        buzzd: false,
    })

    const navigate = useNavigate()


    const changeName = e => {
        const newForm = {...form}
        newForm.name = e.target.value.toLowerCase();
        setForm( newForm )
    }

    const changeSession = e => {
        const newForm = {...form}
        newForm.sessionId = Number(e.target.value);
        setForm( newForm )
    }


    const enterGame = async() => {
        const submitForm = {...form}

        if ( submitForm.name.length < 4 ) {
            alert('Votre pseudo doit comporter au moins 4 lettres !')
        } else if ( submitForm.sessionId === null ) {
            alert('Renseignez un numéro de session.')
        } else if ( submitForm.sessionId.toString().length !== 6 ) {
            alert('Le numéro de session doit comporter 6 chiffres.')
        } else {

            const q = query( collection(db, 'players'), where('sessionId', '==', submitForm.sessionId) )
            const result = await getDocs(q)
            if ( !result.empty ) {
                
                await addDoc( collection(db, 'players'), submitForm )
                    .then( () => {
                        
                        localStorage.setItem('buzzrplayer', JSON.stringify( submitForm ))                        
                        navigate('/game/' + submitForm.name + '/' + submitForm.sessionId)                

                    } )

            } else {

                alert("La session n'existe pas, vérifiez le numéro de session");

            }

        }

    }


    return (

        <div id="start-as-player" className="page">
        
            <div className="form-group inline frame-in" id="player-session-input">
                <div>
                    <input 
                        autoComplete='off' 
                        type="text" 
                        id="input-pseudo" 
                        placeholder="Pseudo"
                        onChange={changeName} 
                    />
                    <input 
                        autoComplete='off' 
                        type="text" 
                        id="input-session" 
                        placeholder="Session"
                        onChange={changeSession} 
                    />
                </div>
            </div>
            <div id="buzzr-wrapper">
                <div id="buzzr-box">
                    <div className="cursor-pointer" id="buzzr" onClick={enterGame}>
                        <p id="buzzr-title">BUZZR</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default StartAsPlayer