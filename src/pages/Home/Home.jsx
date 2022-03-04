import { Link } from 'react-router-dom'
import './home.css'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';

const Home = () => {
    const [id, setId] = useState('');
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            setId(id);
            console.log(id);
        }
    }, [])

    return (
        <div className='container'>
            <div className='container'>
                <p class="font-weight-bold">Bir Oyun Oluştur.</p>
                <button onClick={() => { window.location.href = "/game/create" }} className='btn btn-primary btn-lg'>Oyuna Başla</button>
            </div>
            <div className='container'>
                <p class="fw-bold">Geçerli oyun</p>
                <p> Oyun ID: {localStorage.getItem('sessionURL')}</p>

                <button style={{ display: id ? "" : "none" }} onClick={() => window.location.href = `/game/leaderboard/${id}`} className='btn btn-success btn-lg'>Skor Tablosu</button>

                <button style={{ display: id ? "" : "none" }} className='btn btn-success btn-lg m-2' onClick={(e) => navigator.clipboard.writeText(`http://localhost:3000/game/${id}`)}>Linki Kopyala</button>

                <p class="fst-italic mt-4">Linki kopyalayıp arkadaşlarınla paylaş!</p>
            </div>
        </div>
    )
}



export default Home