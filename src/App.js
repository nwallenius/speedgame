import React, {Component} from 'react';
import './App.css';
import Circle from './Circle/Circle';
import GameOver from './GameOver/GameOver';


const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false
  };

  pace = 1500;
  timer = undefined;

  next = () => {

    let nextActive = undefined;

    do {
      nextActive = getRandomInteger(1, 4);
    } while (nextActive === this.state.current);

    this.setState({
      current:nextActive
    });

    this.pace *= 0.95;
    this.timer = setTimeout(this.next.bind(this), this.pace);

    console.log(this.state.current);
  }


  clickHandler = (buttonId) => {

    console.log('Button was clicked', buttonId);

    if (this.state.current !== buttonId) {
      this.stopHandler();
      return;
    }

    this.setState({
      score: this.state.score +1
    });
    /* Tai näin:
    this.setState(prevState => {
      return {
        score: prevState.score + 1  // prevState on itse keksitty nimi ominaisuudelle eli nimi voi olla ihan mitä vaan
      }})
    */
  }


  startHandler = () => {
    this.next();
  }


  stopHandler = () => {
    clearTimeout(this.timer);
    
    this.setState( {
      showGameOver: true
    })
  }
 

  render () {
    return (
      <div>
        <h1>Speedgame</h1>
        <p className="Score">Score: {this.state.score}</p>

          <Circle 
          buttonColor='darkgoldenrod'
          active={this.state.current === 1}
          click={() => this.clickHandler(1)} 
          />
          <Circle 
          buttonColor='darkred'
          active={this.state.current === 2}
          click={() => this.clickHandler(2)} 
          />
          <Circle 
          buttonColor='darkolivegreen'
          active={this.state.current === 3}
          click={() => this.clickHandler(3)} 
          />
          <Circle 
          buttonColor='darkblue'
          active={this.state.current === 4}
          click={() => this.clickHandler(4)} 
          />

        <div className="Buttons">
            <button onClick={this.startHandler}>Start game</button>
            <button onClick={this.stopHandler}>Stop game</button>
        </div>  

        {this.state.showGameOver && <GameOver score={this.state.score} />}
      </div>
    );
  }
};

export default App;


