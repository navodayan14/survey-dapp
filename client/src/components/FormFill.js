import React from 'react'
import '../App.css'

import { useState, useEffect } from 'react'

const FormFill = ({ candidatearr, voting, account }) => {
  const [newVoting, setnewVoting] = useState({
    startDelay: 0,
    duration: 0,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const duration = newVoting.duration
    const startDelay = newVoting.startDelay

    if (duration > 0 && candidatearr.length > 0) {
      let arr = []
      for (let i = 0; i < candidatearr.length; i++) {
        arr.push(candidatearr[i].candidate)
      }

      await voting.methods
        .newVoting(arr, startDelay, duration)
        .send({ from: account })
    } else {
      alert('duration and options should be grater than zero')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    if (name === 'startDelay') {
      setnewVoting({ ...newVoting, [name]: value })
    } else {
      setnewVoting({ ...newVoting, [name]: value })
    }
  }

  return (
    <>
      <div className='form-fill'>
        <form onSubmit={handleSubmit}>
          <div className='frm-box'>
            <label htmlFor='startDelay'>Enter Voting Delay(minutes)-</label>
            <br></br>
            <input
              type='number'
              id='startDelay'
              name='startDelay'
              value={newVoting.startDelay}
              onChange={handleChange}
            />
          </div>

          <div className='frm-box'>
            <label htmlFor='duration'>Enter Voting Duration(minutes)-</label>
            <br></br>
            <input
              type='number'
              id='duration'
              name='duration'
              value={newVoting.duration}
              onChange={handleChange}
            />
          </div>

          <button type='submit'>Start Voting</button>
        </form>
      </div>
    </>
  )
}

export default FormFill
