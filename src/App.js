import React from 'react';
import './App.css'

const Hole  = ({hasPawn, ...rest}) => {
  return <span {...rest}>
  {hasPawn ?  '⛳️' : '🕳'}
  </span>
}


class App extends React.Component {
  constructor(props){
    super(props)
this.state = {
  map: Object.assign({},[
    "0","0","+","+","+","0","0",
    "0","0","+","+","+","0","0",
    "+","+","+","+","+","+","+",
    "+","+","+","-","+","+","+",
    "+","+","+","+","+","+","+",
    "0","0","+","+","+","0","0",
    "0","0","+","+","+","0","0",
  ]),
  selected: -1
}}

render(){
  const {map, selected} = this.state
  return (
    <div className="App">
      <div>remaining: <span>{(Object.values(map).filter(e => e === '+').length)}</span></div>
      {
        Object.values(map).map((tile,index) => 
        { 
          return <>
          { 
            (() => {
              switch(tile){
                  case '-':
                    return  <Hole 
                    key={index} 
                    onClick={
                        () => {
                          const up = selected - 7
                          const down = selected + 7

                          this.setState(prev => {
                          const top = prev.selected - 7
                          const down = prev.selected + 7
                          const left = prev.selected - 1
                          const right = prev.selected + 1
                          const movedUp = prev.selected - index === 14
                          const movedDown = prev.selected - index === -14
                          const movedRight = prev.selected - index === - 2
                          const movedLeft = prev.selected - index === 2
                          const collisionCheck =  movedUp || movedDown || movedRight || movedLeft 

                          return {
                            map:prev.selected !== -1 && 
                            ( (movedUp && prev.map[top] === '+') ||
                              (movedDown && prev.map[down] === '+') || 
                              (movedLeft && prev.map[left] === '+') ||
                              (movedRight && prev.map[right] === '+'))
                            ? {
                              ...prev.map,
                              [top]: prev.map[top] && prev.map[top] !== "0"
                                ? (collisionCheck && movedUp) ? '-' : prev.map[top] 
                                : undefined,
                              [down]: prev.map[down] && prev.map[down] !== "0"
                                ? (collisionCheck && movedDown) ? '-' : prev.map[down] 
                                : undefined,
                              [left]: prev.map[left] && prev.map[left] !== "0"
                                ?(collisionCheck && movedLeft) ? '-' : prev.map[left] 
                                : undefined,
                              [right]: prev.map[right]&& prev.map[right] !== "0"
                                ?(collisionCheck && movedRight) ? '-' : prev.map[right] 
                                : undefined,
                              [prev.selected]: collisionCheck? '-' : '+',
                              [index]: collisionCheck ? '+' : '-'
                              }
                            : prev.map,
                            selected: -1
                          }})}}  
                    hasPawn={false} />
            case '+':
              return  <Hole 
                key={index}
                style={{backgroundColor: selected === index ? 'red': 'white'}} 
                onClick={() => this.setState({selected: index})} 
                hasPawn={true} />            
            case '0':
              return null
            default:
              return null
            }
          })()}
          {(index+1)%7 === 0 && <br/>}
          </>
        })
      }
    </div>
  );
}
}

export default App;
