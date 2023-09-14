import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function StartAsMj() {


    const [form, setForm] = useState({
        name: '',
        sessionId: Math.floor(100000 + Math.random() * 900000),
        gameStatus: 'wait',
        isMj: true,
        bonus: 10,
        malus: 5,
    })

    const navigate = useNavigate()


    useEffect( () => {

        // Change le numéro de session s'il existe déjà en BDD
        const fetchData = async() => {
            const q = query( collection(db, 'players'), where('sessionId', '==', form.sessionId) )
            const result = await getDocs(q)
            const isEmpty = result.empty
            if ( !isEmpty ) {

                let newForm = {...form}
                newForm.sessionId = Math.floor(100000 + Math.random() * 900000)
                setForm( newForm )

            }
        }
        fetchData()

    }, [form] )


    const changeName = e => {
        const newForm = {...form}
        newForm.name = e.target.value.toLowerCase();
        setForm( newForm )
    }


    const enterGame = async() => {
        const submitForm = {...form}

        if ( submitForm.name.length < 4 ) {

            alert('Votre pseudo doit comporter au moins 4 lettres !')

        } else {

            await addDoc( collection(db, 'players'), submitForm )
            .then(() => {
                    localStorage.setItem('buzzrplayer', JSON.stringify( submitForm ))
                    navigate('/game/' + submitForm.name + '/' + submitForm.sessionId)
                })
        }
    }


    return (

        <div id="start-as-mj" className="page">
        
            <div id="buzzr-wrapper">

                <form className="form-group inline frame-in" id="player-session-input">
                    <div>
                        <input 
                            autoComplete='off' 
                            type="text" 
                            id="input-pseudo" 
                            placeholder="Pseudo"
                            onChange={changeName} 
                        />
                    </div>
                </form>

                <div id="buzzr-box">
                    <div id="buzzr" onClick={enterGame}>
                        <p id="buzzr-title">BUZZR</p>
                    </div>
                    <div className="frame-in" id="buzzr-text">
                        <p id="buzzr-subtitle">Invite des amis avec le numéro de session</p>
                        <p id="session-number">{ form.sessionId }</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default StartAsMj