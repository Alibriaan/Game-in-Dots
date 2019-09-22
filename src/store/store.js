
import { observable, action, decorate } from 'mobx';
import { createContext } from 'react'
import axios from 'axios';
import moment from 'moment';

class Store {
  constructor () 
  {
     const fetchData = async () =>
    {
        let requ = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/game-settings');
            this.mode = requ.data;

            for(let key in requ.data)
            {
                this.gameClass.set(key , key);
            }

            requ = await axios.get('http://starnavi-frontend-test-task.herokuapp.com/winners');
            this.leaderBoard = requ.data;
        }
        
        fetchData();
}

 mode;
 name = 'Player';
 currMode = { name: "Pick game mode" };
 leaderBoard = undefined;
 squareList = undefined;
 gameStatus = false;
 score = {player: 0 , computer: 0};
 gameClass = new Map();

// Функция смены имени ( Меняет имя на то которое введенно в поисковой строке )
  changeName = (event) =>
 {
    this.name = event.target.value;
 }
 
 // Функция смены режима игры ( Меняет режим игры и пересоздает поле в зависимости от типа)
changeMode = (event) => {

    this.squareList = [];
    let data = this.mode[event.target.value];
    this.currMode = {name: event.target.value , data};
    let arr =new Array(data.field * data.field).fill('nothing');
    this.squareList =  arr;
}

// Функция старта игры ( Проверяет режим игры обнуляет поле, обнуляет статистику игрока и компютера , Если режим игры стандартный игнорирует)
 startGame = () =>
 {

    if(this.currMode.name !== "Pick game mode")
    {

    this.squareList = this.squareList.map( () => 'nothing');
    this.score = { player: 0 , computer: 0};
    this.gameStatus = true;
    this.randCurrBlock();
    }
  }

  // Функция смены цвета блока при клике ( Проходит массив если индек кликнутого current изменяет на success и дает поинт игроку иначе игнорирует)
  changeColor = (event) => {


    this.squareList = this.squareList.map(  (item , index) =>
     {
          if(String(index+1) === String(event.currentTarget.dataset.div_id) && item === 'current' )
          {
              this.score = {
                  player: this.score.player+1,
                  computer: this.score.computer 
              };
              this.CheckWinner();

              return 'success';
          }
          else
          {
              return item;
          }
        });
  }

  // Функция проверки статистики игры ( Проверяет достигнут ли предел в 50% - меняет гейм статус (проверка победы , поражения , ничья ) - отправка результата на сервер)

  CheckWinner = () =>
  {


    if (( this.score.player + this.score.computer) === +(this.currMode.data.field * this.currMode.data.field))
    {
          this.gameStatus = false;

          fetch( 'http://starnavi-frontend-test-task.herokuapp.com/winners',
          {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({winner: 'Tie', date: moment().format('HH:mm; DD MMMM YYYY')}),
          }
      )

    }
    else if( +this.score.player > +(this.currMode.data.field * this.currMode.data.field / 2))
              {
                  this.gameStatus = false;

        
                  fetch( 'http://starnavi-frontend-test-task.herokuapp.com/winners',
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({winner: this.name, date: moment().format('HH:mm; DD MMMM YYYY')}),
                    }
                )
              }
      else if( +this.score.computer > +(this.currMode.data.field * this.currMode.data.field / 2))
      {
          this.gameStatus = false;
          fetch( 'http://starnavi-frontend-test-task.herokuapp.com/winners',
          {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({winner: 'Computer', date: moment().format('HH:mm; DD MMMM YYYY')}),
          }
      )
      }
  }


  // Функция первого текущего квадрата при старте игры
  randCurrBlock = () =>
    {
        let rand = Math.floor(Math.random() * this.squareList.length);

        while( this.squareList[rand] !== 'nothing')
        {
            rand = Math.floor(Math.random() * this.squareList.length);
        }
        
        let arr = this.squareList.map(( (item , index) => {
            if(String(index) === String(rand))
            {
                return 'current';
            }
            else
            {
                return item;
            }
        }));

        this.squareList = arr;
    }

// Функция игрового процесса ( Ищет текущий элемент - если есть компютер получает поинт после проверки на победу делает рандомный элемент текущим)
     gameReactions = () =>{

        this.squareList = this.squareList.map( (item , index) => {
            if(item === 'current')
            {
                this.score = {
                    player: this.score.player,
                    computer: this.score.computer + 1 
                };

                this.CheckWinner();
                return 'fail';
            }
            else
            {
                return item;
            }
        });


        if(this.gameStatus)
        {

        let rand = Math.floor(Math.random() * this.squareList.length);
        
        while( this.squareList[rand] !== 'nothing')
        {
            rand = Math.floor(Math.random() * this.squareList.length);
        }

        this.squareList = this.squareList.map( (item , index) => {
            
            if(String(index) === String(rand))
            {
                return 'current';
            }
            else
            {
                return item;
            }
        });
    };

}
}   

// Декорация свойств и методов
decorate(Store, {
  mode: observable,
  name: observable,
  currMode: observable,
  leaderBoard: observable,
  squareList: observable,
  gameStatus: observable,
  gameClass: observable,
  score: observable,
  changeName: action,
  changeMode: action,
  startGame: action,
  changeColor: action,
  CheckWinner: action,
  randCurrBlock: action,
  gameReactions: action,
})

// Создание экземпляра
const m = new Store();
// Експорт и привязка контекста
export default createContext(m);
