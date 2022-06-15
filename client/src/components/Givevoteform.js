import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react'

const Givevoteform = ({ data, account, voting }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (myOption.length > 0) {
      let rcp = await voting.methods.giveVote(myOption).send({ from: account })
    } else {
      alert('plz select a valid option')
    }
  }

  const handelChange = (e) => {
    setmyOption(e.target.value)
  }

  const [myOption, setmyOption] = useState('')
  return (
    <>
      <div className='main-page'>
        <form onSubmit={handleSubmit} className='givevote-frm'>
          <div className='frm-box'>
            <label>Select Option</label>
            <br />
            <select value={myOption} onChange={handelChange}>
              {data.map((option) => {
                const { index, name } = option
                return (
                  <option value={name} key={index}>
                    {name}
                  </option>
                )
              })}
            </select>
          </div>
          <button type='submit' className='btn'>
            Give Vote
          </button>
        </form>
      </div>
    </>
  )
}

export default Givevoteform
