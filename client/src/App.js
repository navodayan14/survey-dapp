import React, { useState } from 'react'
import Web3 from 'web3'
import { useEffect } from 'react'
import './App.css'
import NewVoting from './components/NewVoting'
import GiveVote from './components/GiveVote'
import ShowResult from './components/ShowResult'
import { Routes, Route, Outlet, Link, Router } from 'react-router-dom'
import Home from './components/Home'

const App = () => {
  useEffect(async () => {
    await loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      setaccount(accounts[0])
    } else {
      alert('please intall metamask')
    }
  }
  const [account, setaccount] = useState('0')

  return (
    <>
      <NewVoting />
    </>
  )
}

export default App
