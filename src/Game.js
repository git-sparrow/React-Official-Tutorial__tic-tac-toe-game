import React, { Component } from 'react'
import './Game.css'
import Board from './components/Board'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      locationHistory: [{ rowNumber: '', columnNumber: '' }],
      sorted: false,
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    const locationHistory = this.state.locationHistory.slice(0, this.state.stepNumber + 1)
    const rowNumber = i => {
      if (i === 0 || i === 1 || i === 2) {
        return 'row #1'
      } else if (i === 3 || i === 4 || i === 5) {
        return 'row #2'
      } else {
        return 'row #3'
      }
    }

    const columnNumber = i => {
      if (i === 0 || i === 3 || i === 6) {
        return 'column #1'
      } else if (i === 1 || i === 4 || i === 7) {
        return 'column #2'
      } else {
        return 'column #3'
      }
    }

     const current2 = document.getElementsByClassName('active')
     if (current2.length > 0) {
         current2[0].className = current2[0].className.replace(' active', '')
     }

    this.setState({
      history: [...history, { squares: squares }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      locationHistory: [
        ...locationHistory,
        { rowNumber: rowNumber(i), columnNumber: columnNumber(i) },
      ],
    })
  }

  jumpTo = (step, e) => {
    const current = document.getElementsByClassName('active')
    if (current.length > 0) {
      current[0].className = current[0].className.replace(' active', '')
    }
    e.target.className += ' active'

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  sortMoveList = () => {
    this.setState({sorted: !this.state.sorted})
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = this.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const rowNumber = this.state.locationHistory[move].rowNumber
      const columnNumber = this.state.locationHistory[move].columnNumber
      const location = ` location: ${rowNumber}, ${columnNumber}`

      const desc = move ? `Go to move #${move} ${location}` : 'Go to Game start'

      return (
        <li key={move}>
          <button className="btn" onClick={e => this.jumpTo(move, e)}>
            {desc}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <button onClick={this.sortMoveList}>{!this.state.sorted ? 'sort by ascending' : 'sort by descending' }</button>
          <div>{status}</div>
          <ol>{!this.state.sorted ? moves : moves.reverse()}</ol>
        </div>
      </div>
    )
  }
}

export default Game
