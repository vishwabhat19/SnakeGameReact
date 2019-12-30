import React from 'react';
import './App.css';
import Snake from './Snake.js';
import Food from './Food.js';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
  }

  const initialState = {
    snakeDots: [
        /*
            Thing to remember here is that the first value in each array is the x or left coordinate
            of the body of the snake.
        */
        [0,0],
        [2,0]
    ],
    food: getRandomCoordinates(),
    direction: 'RIGHT',
    speed: 500
  }

class App extends React.Component{



    state = initialState;

    


    componentDidMount(){
        setInterval(this.moveSnake,this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    snakeMover = () =>{
        
        if(this.state.speed>10){
            clearInterval();
            this.setState({speed:this.state.speed-10})
            setInterval(this.moveSnake,this.state.speed);
        }
        
    }

    componentDidUpdate(){
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEaten();
    }



    onKeyDown = (e) =>{
        console.log("Speed: "+this.state.speed)
       
        e = e || window.event;
        //Set the state based on the key pressed
        switch(e.keyCode){
            case 38:
                this.setState({direction: 'UP'});
                break;
              case 40:
                this.setState({direction: 'DOWN'});
                break;
              case 37:
                this.setState({direction: 'LEFT'});
                break;
              case 39:
                this.setState({direction: 'RIGHT'});
                break;

        }
        this.moveSnake();
    }

    moveSnake = () =>{
        let dots = [...this.state.snakeDots];
       
        
        let head = dots[dots.length-1];
        
        switch(this.state.direction){
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        //console.log('Before push dots is :'+dots);
        dots.push(head);
        //console.log('After push dots is :'+dots);
        dots.shift();
        //console.log('After shift dots is :'+dots);
        this.setState({
            snakeDots: dots
        })
       
    }

    
    checkIfOutOfBorders = () =>{
        let head = this.state.snakeDots[this.state.snakeDots.length -1];
        //console.log(head);
        if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
            this.onGameOver();
        }
    }

    checkIfCollapsed = () =>{
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length -1];
        snake.pop();
        snake.forEach(
            dot =>{
                if(head[0] == dot[0] && head[1] == dot[1]){
                    this.onGameOver();
                }
            }
        )
    }

    checkIfEaten = () =>{
        let head = this.state.snakeDots[this.state.snakeDots.length-1];
        let food = this.state.food;
        if(head[0] == food[0] && head[1] == food[1]){
            //Now you need to change the position of the dot.
            this.setState({
                food:getRandomCoordinates()
            });

            //Also we need to increase the size of the snake
            this.enlargeSnake();
            //Also increase the speed of the snake
            this.snakeMover();
        }
    }

    enlargeSnake = () =>{
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift(newSnake); //Simply adding an empty block to the start of the array which is actually the tail
        this.setState({snakeDots: newSnake});
    }

  

    onGameOver = () =>{
        clearInterval();
        alert("GAME OVER!!");
        this.setState(initialState);
    }
    

    render(){
        return(
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food dot={this.state.food}/>
            </div>
        )
    };

    
}

export default App;
