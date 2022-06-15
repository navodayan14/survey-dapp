import React from 'react'
import '../App.css'

const Result = ({ data }) => {
  // const kata = [
  //   { name: 'rahul singh', votes: 50 },
  //   { name: 'rahul singh', votes: 50 },
  //   {
  //     name: 'lorem50 gefhs jhfbhas asnfbhs sfbashjk akjdhasj asjfj',
  //     votes: 50,
  //   },
  // ]
  return (
    <>
      <div className='main-page'>
        <h3>Result (option:votes)</h3>
        <ul className='result-lst'>
          {data.map((result) => {
            const { name, votes } = result
            return (
              <li key={votes}>
                {name} : {votes}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Result
