import './Field.css';

import useInterval from '../interval/Interval';

import React, { useContext , useEffect } from 'react'
import store from '../store/store'
import { observer } from 'mobx-react'

import moment from 'moment';

//let number = 0 ;
const Field = observer((props) => {


    const localStore = useContext(store);

    useInterval(() => {
        if(localStore.gameStatus === true)
         {
            localStore.gameReactions();
         }

      }, (localStore.gameStatus ) ? localStore.currMode.data.delay : 1000);



     useEffect( () => {
            console.log("Pererender");
            console.log("Player-"  + localStore.score.player + "   Computer-" + localStore.score.computer  );
            
            //let data = new Date();

           // console.log( data.getHours()+ ":" + data.getMinutes() +"; "+ data.toLocaleDateString( 'en-GB' ,{  day : 'numeric'}) + " " + data.toLocaleDateString( 'en-GB' ,{  month : 'long'}) + " " + data.toLocaleDateString( 'en-GB' ,{  year : 'numeric'}));
            //console.log(data.getHours() + ":" + "; " + data.getDate() + " " + data.toLocaleDateString('en-GB' , {  month : 'long'}) );
            //console.log(data.format('DD MMMM YYYY'));
            //console.log(localStore.squareList);
     });

    
    return(
        <div className="root">
        {
            (!localStore.leaderBoard && !localStore.squareList)
            ? (
                <h1>Loading...</h1>
            )
            : (
                <React.Fragment>
                    <div className="game-setings">
                    
                    <select  disabled={localStore.gameStatus} onChange={localStore.changeMode}>
                    <option selected   hidden>{localStore.currMode.name}</option>
                        {
                         Object.keys(localStore.mode).map( item => 
                            <option key={item} value={item}>{item}</option>)
                            }
                        }
                    </select>


                    <input  disabled={localStore.gameStatus} type="text" value={String(localStore.name)} onChange={localStore.changeName}/>
                    <button disabled={localStore.gameStatus} onClick={localStore.startGame}>PLAY</button>
                    </div>

                    <div className='game-wrapper'>
                    <div className="field-wrapper">

                        { 
                           localStore.squareList && localStore.squareList.map( (item , index) => 
                           {
                            if(item === 'nothing')
                            {
                             return <div data-div_id={index+1} key={index+1} onClick={localStore.changeColor} className={'field-item-' + localStore.gameClass.get(localStore.currMode.name)}></div>
                            }
                            else if(item === 'success')
                            {
                             return <div data-div_id={index+1} key={index+1} onClick={localStore.changeColor} className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' success'}></div>
                            }
                            else if(item === 'current')
                            {
                                return <div data-div_id={index+1} key={index+1} onClick={localStore.changeColor}className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' current'}></div>
                            }
                            else if(item === 'fail')
                            {
                                return <div data-div_id={index+1} key={index+1} onClick={localStore.changeColor}className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' fail'}></div>  
                            }   
                            }
                           )
                            
                        }

                    </div>

                                        
                    <div className="leader-board">
                        <h1>Leade Board</h1>
                        {
                        localStore.leaderBoard.slice(-10).map( (item) => (
                            <div>{item.winner} : {item.date}</div>
                        ))
                        }

                    </div>   
                   
                    </div>
                </React.Fragment>
            )
    }
    </div>
    )

});

export default Field;

/*
  <div className="root">
        {
            (!localStore.leaderBoard && !localStore.squareList)
            ? (
                <h1>Loading...</h1>
            )
            : (
                <React.Fragment>

                    <div className="game-setings">
                    
                    <select  disabled={localStore.gameStatus} onChange={localStore.changeMode}>
                    <option selected   hidden>{localStore.currMode.name}</option>
                        {
                         Object.keys(localStore.mode).map( item => 
                            <option key={item} value={item}>{item}</option>)
                            }
                        }
                    </select>


                    <input  disabled={localStore.gameStatus} type="text" value={String(localStore.name)} onChange={localStore.changeName}/>
                    <button disabled={localStore.gameStatus} onClick={localStore.startGame}>PLAY</button>
                    </div>

                    <div className='game-wrapper'>
                    <div className="field-wrapper">

                        { 
                           localStore.squareList && localStore.squareList.map( (item) => 
                           {
                            if(item === 'nothing')
                            {
                             return <div data-div_id={++localStore.number} key={localStore.number} onClick={localStore.changeColor} className={'field-item-' + localStore.gameClass.get(localStore.currMode.name)}></div>
                            }
                            else if(item === 'success')
                            {
                             return <div data-div_id={++localStore.number} key={localStore.number} onClick={localStore.changeColor} className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' success'}></div>
                            }
                            else if(item === 'current')
                            {
                                return <div data-div_id={++localStore.number} key={localStore.number} onClick={localStore.changeColor}className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' current'}></div>
                            }
                            else if(item === 'fail')
                            {
                                return <div data-div_id={++localStore.number} key={localStore.number} onClick={localStore.changeColor}className={'field-item-' + localStore.gameClass.get(localStore.currMode.name) + ' fail'}></div>  
                            }   
                            }
                           )
                            
                        }

                    </div>

                                        
                    <div className="leader-board">
                        <h1>Leade Board</h1>
                        {
                        localStore.leaderBoard.map( (item) => (
                            <div>{item.winner} : {item.date}</div>
                        ))
                        }

                    </div>   
                   
                    </div>

                    
                </React.Fragment>

            )
    }
    </div>
*/
/*
let gameClass = new Map();
let number = 0 ;

const Field = () => {

    const [mode, setMode] = useState(undefined);      // Список режимов игры
    const [name, setName] = useState("Player");       // Имя игрока
    const [currMode , setCurrMode] = useState({name:"Pick game mode"});     // Текущий режим object { name: название мода  { данные мода (количество полей . задержка)}}
    const [leaderBoard, setLeaderBoard] = useState(undefined);     // Массив статистики игроков
    const [squareList , setSquareList] = useState(undefined);     // Квадратики в виде массива (их статус)
    const [gameStatus , setGameStatus] = useState(false);     // Статус начала игры
    const [score , setScore] = useState( {player: 0 , computer: 0} ); // Статистика квадратов игрока и компютера


    // Функция смены имени
    const changeName = (event) =>
    {
        setName(event.target.value);
    }

    // Смена режима игры (доработать блокировку при игре)
    const changeMode = (event) => {
        number = 0 ;
        let data = mode[event.target.value];
        setCurrMode({name: event.target.value , data});
        setSquareList(new Array(data.field * data.field).fill('nothing'));
    }

    // Старт игры (доработать блокировку при игре)
    const startGame = () =>{

        console.log(squareList);

        if(!gameStatus && currMode.name !== "Pick game mode")
        {
        console.log("Start Game");
        console.log(squareList);      


        setGameStatus(true);
        randCurrBlock();
        }
        else
        {
            console.log("Error");
        }
    }

    // Смена цвета при клике
    const changeColor = (event) => {

      number = 0 ;
      setSquareList(squareList.map(  (item , index) =>
       {
            if(String(index+1) === String(event.currentTarget.dataset.div_id) && item === 'current' )
            {
                CheckWinner();
                setScore( {
                    player: score.player+1,
                    computer:score.computer 
                });
                return 'success';
            }
            else
            {
                return item;
            }
          }));
    }

    // Проверка победителя( > 50%)
    const CheckWinner = () =>
    {
        console.log("Check Winner");

        if( String(score.player + 1) === String(Math.ceil(currMode.data.field * currMode.data.field / 2)))
                {
                    console.log("KONEC IGRI IGROK WIN");
                    setGameStatus(false);

                }
        else if( String(score.computer + 1) === String(Math.ceil(currMode.data.field * currMode.data.field / 2)))
        {
            console.log("KONEC IGRI KOMPUTER WIN");
            setGameStatus(false);
        }
    }

    const randCurrBlock = () =>
    {
        let rand = Math.floor(Math.random() * squareList.length);
        while( squareList[rand] !== 'nothing')
        {
            rand = Math.floor(Math.random() * squareList.length);

        }
        console.log(rand+1);
        
        number = 0;
        let arr = squareList.map(( (item , index) => {
            if(String(index) === String(rand))
            {
                return 'current';
            }
            else
            {
                return item;
            }
        }));

        setSquareList(arr);

    }

    const gameReactions = () =>{

        //let arr = squareList.slice();
        //console.log(arr);

        let rand = Math.floor(Math.random() * squareList.length);
        while( squareList[rand] !== 'nothing')
        {
            rand = Math.floor(Math.random() * squareList.length);
        }


         squareList.forEach( (item , index) => {
            if(item === 'current')
            {
                CheckWinner();
                setScore( () => {
                    return {
                    player: score.player,
                    computer: score.computer + 1 
                }} );
            }
        });

        number = 0;

        setSquareList(squareList.map( (item , index) => {
            
            if(String(index) === String(rand) &&  String(score.computer + 1) !== String(Math.ceil(currMode.data.field * currMode.data.field / 2)) )
            {
                return 'current';
            }
            else if( item === 'current')
            {
                return 'fail';
            }
            else
            {
                return item;
            }
        }));
    };


    useInterval(() => {
        // Your custom logic here
        if(gameStatus === true)
         {
            gameReactions();
         }

      }, (gameStatus === true) ? currMode.data.delay : 0);

 useEffect( () => {
console.log("USEFFECT ARR")
console.log(squareList);
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
                        
                        <select  disabled={gameStatus} onChange={changeMode}>
                        <option selected   hidden>{currMode.name}</option>
                            {
                             Object.keys(mode).map( item => 
                                <option key={item} value={item}>{item}</option>)
                                }
                            }
                        </select>


                        <input  disabled={gameStatus} type="text" value={String(name)} onChange={changeName}/>
                        <button disabled={gameStatus} onClick={startGame}>PLAY</button>
                        </div>

                        <div className='game-wrapper'>
                        <div className="field-wrapper">

                            { 
                               squareList && squareList.map( (item) => 
                               {
                                if(item === 'nothing')
                                {
                                 return <div data-div_id={++number} key={number} onClick={changeColor}className={'field-item-' + gameClass.get(currMode.name)}></div>
                                }
                                else if(item === 'success')
                                {
                                 return <div data-div_id={++number} key={number} onClick={changeColor}className={'field-item-' + gameClass.get(currMode.name) + ' success'}></div>
                                }
                                else if(item === 'current')
                                {
                                    return <div data-div_id={++number} key={number} onClick={changeColor}className={'field-item-' + gameClass.get(currMode.name) + ' current'}></div>
                                }
                                else if(item === 'fail')
                                {
                                    return <div data-div_id={++number} key={number} onClick={changeColor}className={'field-item-' + gameClass.get(currMode.name) + ' fail'}></div>  
                                }   
                                }
                               )
                                
                            }

                        </div>

                                            
                        <div className="leader-board">
                            <h1>Leade Board</h1>
                            {
                            leaderBoard.map( (item) => (
                                <div>{item.winner} : {item.date}</div>
                            ))
                            }

                        </div>   
                       
                        </div>

                        
                    </React.Fragment>

                )
        }

        </div>
    );
}


export default Field;

*/

