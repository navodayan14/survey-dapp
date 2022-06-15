import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'

const SelectCandidate = ({ candidatearr, setcandidatearr }) => {
  const [candidate, setcandidate] = useState('')

  const [index, setindex] = useState(0)

  const handelSubmit = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (candidate !== '') {
      setcandidatearr([...candidatearr, { index: index, candidate: candidate }])
      setindex(index + 1)
      setcandidate('')
    } else {
      alert('plz chose a text for option')
    }
  }

  const handelChange = (e) => {
    setcandidate(e.target.value)
  }

  const removeCandidate = (id) => {
    const newcandidatearr = candidatearr.filter((cand) => {
      return id !== cand.index
    })

    for (let i = 0; i < newcandidatearr.length; i++) {
      newcandidatearr[i].index = i
    }
    setcandidatearr(newcandidatearr)
    setindex(newcandidatearr.length)
  }

  return (
    <>
      <div className='newvote-frm'>
        <form onSubmit={handelSubmit} className='newvote-frm'>
          <div className='frm-box'>
            <label>Enter Option</label>
            <br />
            <textarea value={candidate} onChange={handelChange} />
          </div>
          <button type='submit' className='btn'>
            save
          </button>
        </form>

        {candidatearr.map((cand) => {
          const { index, candidate } = cand
          return (
            <div key={index} className='cnd-lst'>
              <p>
                {index + 1} : {candidate}
              </p>
              <button
                onClick={() => {
                  removeCandidate(index)
                }}
              >
                remove
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SelectCandidate
