import React from 'react'
import { useState, useEffect } from 'react'
import "./leaderboard.css"

const LeaderBoard = () => {
    //fetch data for leaderboard
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setİsLoading] = useState(true);
    const [name, setName] = useState('');
    const [oneUser, setOneUser] = useState(false);
    const [oneUserName, setOneUserName] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const slug = window.location.href.split('/')[5]
            const url = `http://localhost:5000/api/game/${slug}`;
            const response = await fetch(url);
            const data = await response.json();
            const sortedLeaderboard = data.leaderboard.sort((a, b) => b.score - a.score)
            setName(data.name);
            await setData(data);
            await setLeaderboard(sortedLeaderboard);
            console.log(data);
        }
        try {
            fetchData();
            setİsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleClick = (name) => {
        setOneUser(true);
        setOneUserName(name)
    }

    return (
        <div className='paper'>

            <p className='name-title'>{name}' adlı kişinin oyunu</p>
            <div className='container'>
                {isLoading ? <p>Yükleniyor...</p> :
                    <table className='table table-warning'>
                        <thead>
                            <tr>
                                <th>Sıra</th>
                                <th>Kullanıcı Adı</th>
                                <th>Puan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><input value={item.name} type={"submit"} onClick={(e) => handleClick(item.name)} /></td>
                                        <td>{item.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                {/* show one user answers */}
                {oneUser ? <UserAnswers data={data} leaderboard={leaderboard} name={oneUserName} /> : null}
            </div>
        </div>

    )
}

const UserAnswers = ({ data, leaderboard, name }) => {
    var userAnswers;
    leaderboard.map((item, index) => {
        if (item.name === name) {
            userAnswers = item.answers;
        }
    })
    console.log(userAnswers);
    return (
        <div className='paper'>
            <div className='container'>
                <table className='table table-warning'>
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Cevap</th>
                            <th>Doğru cevap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAnswers.map((item, index) => {
                            return (
                                <tr className={item.isTrue ? "table-success" : "table-danger"} key={index}>
                                    <td >{data.questions[index].question}</td>
                                    <td>{item.answer}</td>
                                    <td>{data.questions[index].correctAnswer}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default LeaderBoard