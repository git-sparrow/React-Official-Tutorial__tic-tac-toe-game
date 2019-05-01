import React from 'react'
import Square from './Square'

class Board extends React.Component {

  renderSquare = (i) => {
    return <Square id={i} key={i.toString()} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
  }

  render() {
      let rows = []
      let renderSquare = this.renderSquare
      for (let i = 0, index = 0; i < 3; i++) {
          rows.push(
              <div className="board-row" key={i}>
                  {function() {
                      let cells = []
                      for(let j = 0; j < 3; j++) {
                            cells.push(renderSquare(index))
                          index++
                      }
                      return cells
                  } ()}
              </div>)
      }

    return (
      <div>
          {rows}
      </div>
    )
  }
}

export default Board
