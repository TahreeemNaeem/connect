import { InjectedConnector } from '@wagmi/core'
import React from 'react'
import { useConnect } from 'wagmi'


export default function Connect() {
    const { connect } = useConnect({
        connector: new InjectedConnector(),chainId:5
        })
    
  return (
    <button onClick={() => connect()}>Connect Wallet</button>
  )
}