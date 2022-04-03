import Die from "./components/Die";
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
const allNewDice = () => {
  const newDice = []
  for (let i = 0; i < 10; i++) {
    newDice.push(
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    )
  }
  return newDice
}

const isGameCompleted = allDies => {
  let value = allDies[0].value

  for (let j = 0; j < allDies.length; j++) {
    if (!allDies[j].isHeld) {
      return false
    }
    if (allDies[j].value !== value) {
      return false
    }
  }
  return true
}

function App() {
  const [allDies, setDies] = useState(allNewDice())
  const [isGameDone, setGameDone] = useState(false)
  useEffect(() => {
    setGameDone(isGameCompleted(allDies))
  }, [allDies])

  const holdDie = (dieId) => {
    setDies(old => old.map(d => d.id === dieId ? { ...d, isHeld: !d.isHeld } : d))

  }

  const rollDies = () => {
    if (isGameDone) {
      setDies(allNewDice())
      setGameDone(false)
    } else {
      setDies(old => old.map(d => d.isHeld ? d : { ...d, value: Math.ceil(Math.random() * 6), }))
    }
  }

  return (
    <main className="main--cls">
      {isGameDone && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="grid--div">
        {allDies.map(d => <Die
          key={d.id}
          val={d.value}
          isHeld={d.isHeld}
          hold={holdDie}
          id={d.id}
        />)}
      </div>
      <button className="roll-dice" onClick={rollDies}> {isGameDone ? 'New Game' : 'Roll'} </button>
    </main>
  );
}

export default App;
