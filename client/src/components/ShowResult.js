import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import AlResult from './AlResult'
import Result from './Result'
import Voting from '../Voting.json'
import NavBar from './NavBar'

const ShowResult = () => {
  useEffect(async () => {
    await loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const voting = new web3.eth.Contract(
        Voting.abi,
        '0x64b940a8F27B7B6DFEc6bD16C550C5BA7273077b'
      )

      let result = await voting.methods.showResult().call()
      let resultcount = result[0]
      let resultname = result[1]

      let data = []
      for (let i = 0; i < resultcount.length; i++) {
        data.push({ name: resultname[i], votes: resultcount[i] })
        if (resultcount.length > 0) {
          setisresult(true)
        }
        setdata(data)
      }
    } else {
      alert('please intall metamask')
    }
  }

  const [data, setdata] = useState([])
  const [isresult, setisresult] = useState(false)
  return (
    <>
      <NavBar />
      {isresult ? <Result data={data} /> : <AlResult />}
    </>
  )
}

export default ShowResult
