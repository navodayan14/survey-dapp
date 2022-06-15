import React from 'react'
import Givevoteform from './Givevoteform'
import Alvoted from './Alvoted'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Voting from '../Voting.json'
import NavBar from './NavBar'

const GiveVote = () => {
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
      let isvote = await voting.methods.isVoted(accounts[0]).call()

      setisvoted(isvoted)

      let optionname = await voting.methods.showOptions().call()
      let data = []
      for (let i = 0; i < optionname.length; i++) {
        data.push({ name: optionname[i], index: i + 1 })
      }
      setdata(data)
    } else {
      alert('please intall metamask')
    }
  }

  const [data, setdata] = useState([{}])
  const [account, setaccount] = useState('0')
  const [isvoted, setisvoted] = useState(true)
  const [voting, setvoting] = useState('')

  return (
    <>
      <NavBar />
      {isvoted ? (
        <Givevoteform data={data} account={account} voting={voting} />
      ) : (
        <Alvoted />
      )}
    </>
  )
}

export default GiveVote
