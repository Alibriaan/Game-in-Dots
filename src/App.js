import React from 'react';
import logo from './logo.svg';
import './App.css';
import Field from './field/Field';

function App() {
  return (
    <Field />
  );
}

export default App;


/*
import React, {useState, useEffect} from 'react';
import './Field.css';
import axios from 'axios';

let gameClass = new Map();
let number = 0 ;

const Field = () => {

    // Список режимов игры
    const [mode, setMode] = useState(undefined);
   // Имя игрока
        const [name, setName] = useState("Player");

    // Текущий режим object { name: название мода  { данные мода (количество полей . задержка)}}
    const [currMode , setCurrMode] = useState({name:"Pick game mode"});

    // Массив статистики игроков
    const [leaderBoard, setLeaderBoard] = useState(undefined);

    // Квадратики в виде массива
    const [squareList , setSquareList] = useState(undefined);

    // Статус начала игры
    const [gameStatus , setGameStatus] = useState(false);

    const changeName = (event) =>
    {
        setName(event);
    }

    const changeMode = (event) => {
        console.log('CHANGE MODE')
        
        number = 0 ;
        let data = mode[event.target.value];
        setCurrMode({name: event.target.value , data});

        setSquareList(
        new Array(data.field * data.field).fill(' ').map( (item) => {
            return <div data-div_id={++number} key={number} onClick={startGame}  className={'field-item-' + gameClass.get(event.target.value)}></div>
        }));

    }

    const startGame = () =>{

        console.log("Start Game");
        console.log(squareList);

    }

    const changeColor = () => {
            //event
        console.log("CHANGE COLOR");
        //console.log(event.currentTarget.dataset.div_id); 
        console.log(squareList);
    }

 useEffect( () => {
    console.log("EFFECT ALL");
    console.log(squareList);
    setGameStatus(true);
});


useEffect(() => {

    async function fetchData()
    {
        console.log("Effect first");
            let requ = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/game-settings');
            setMode(requ.data);

            for(let key in requ.data)
            {
                gameClass.set(key , key);
            }

            requ = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/winners');
            setLeaderBoard(requ.data);
        }
        
        fetchData();

    } , []);

    return (

        <div className="root">

            {
                (!leaderBoard && !squareList)
                ? (
                    <h1>Loading...</h1>
                )
                : (
                    <React.Fragment>

                        <div className="game-setings">
                        
                        <select  onChange={changeMode}>
                        <option selected  hidden>{currMode.name}</option>
                            {
                             Object.keys(mode).map( item => 
                                <option key={item} value={item}>{item}</option>)
                                }
                            }
                        </select>


                        <input type="text" value={name.toString()} onChange={changeName}/>
                        <button onClick={startGame}>PLAY</button>
                        </div>
                        <div className="field-wrapper">

                            { 
                               squareList && squareList.map( (item) => item 
                                )
                            }

                        </div>
                       
                        <div className="leader-board-wrapper">

                        </div>
                    </React.Fragment>

                )
        }

        </div>
    );
}

export default Field;

/*
  leaderBoard.map( (item) => <div> 
                            <h1>{item.winner} : {item.date}</h1>
                        </div>)
*/
