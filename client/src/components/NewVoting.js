import React from 'react'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import SelectCandidate from './SelectCandidate'
import FormFill from './FormFill'
import Voting from '../Voting.json'
import '../App.css'
import NavBar from './NavBar'

const NewVoting = () => {
  useEffect(async () => {
    await loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      setaccount(accounts[0])
      const voting = new web3.eth.Contract(
        Voting.abi,
        '0x64b940a8F27B7B6DFEc6bD16C550C5BA7273077b'
      )
      setvoting(voting)
    } else {
      alert('please intall metamask')
    }
  }
  const [voting, setvoting] = useState('')
  const [account, setaccount] = useState('0')
  const [candidatearr, setcandidatearr] = useState([])
  return (
    <>
      <NavBar />
      <div className='main-page'>
        <SelectCandidate
          candidatearr={candidatearr}
          setcandidatearr={setcandidatearr}
        />
        <FormFill
          candidatearr={candidatearr}
          voting={voting}
          account={account}
        />
      </div>
    </>
  )
}

export default NewVoting
