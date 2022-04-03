import React from 'react'
import '../index.css';

function Die(props) {
  return (
    <div className={props.isHeld ? "die--cls is-held" : "die--cls"} onClick={() => props.hold(props.id)}>
      <h2 className='.die-num'>{props.val}</h2>
    </div>
  )
}

export default Die