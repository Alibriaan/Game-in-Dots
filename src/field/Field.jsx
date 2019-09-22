import './Field.css';

import useInterval from '../interval/Interval';

import React, { useContext , useEffect } from 'react'
import store from '../store/store'
import { observer } from 'mobx-react'

const Field = observer((props) => {


    const localStore = useContext(store);

    useInterval(() => {
        if(localStore.gameStatus === true)
         {
            localStore.gameReactions();
         }

      }, (localStore.gameStatus ) ? localStore.currMode.data.delay : 1000);


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
