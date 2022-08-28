import { ethers, utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import { btnStyle } from ".";
import ERC20ABI from '../assets/erc20.json'
import style from './index.module.css';
const tokenAddress = "0xe2D7250B2EC3CD208AC5B42886Edd162411529C4"
enum StateType {
  INIT,
  LODING,
  FINISH,
}
export const WalletPage = () => {
  const [balance, setBalance] = useState('')
  const [address, setAddress] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [tx, setTx] = useState('')
  const [state, setState] = useState(StateType.INIT)
  const walletRef = useRef<ethers.Wallet | null>(null)
  useEffect(() => {
    getData()
  }, []);
  const getData = async () => {
    // privateKey
    if (walletRef.current === null) {
      const provider = new ethers.providers.InfuraProvider("goerli", import.meta.env.VITE_INFURA_KEY)
      const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider)
      walletRef.current = wallet
    }
    const wallet = walletRef.current
    const balance = await wallet.getBalance()
    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, wallet)
    const tokenBalance = await tokenContract.balanceOf(wallet.address)
    setTokenBalance(utils.formatUnits(tokenBalance, 6))
    setBalance(utils.formatEther(balance))
    setAddress(wallet.address)
  }
  const handleSentETH = async () => {
    if (state === StateType.LODING || !walletRef.current) return
    setState(StateType.LODING)
    setTx('')
    const wallet = walletRef.current
    const tx = await wallet.sendTransaction({
      to: "0x8cE60Fc0158dB2F9AB93359FCcb590d566BACcf7",
      value: ethers.utils.parseEther("0.01"),
    })
    getData()
    setState(StateType.FINISH)
    setTx(tx.hash)
  }
  return (
    <div style={{ padding: 30 }}>
      <p>展示钱包信息</p>
      <div onClick={getData} style={{ ...btnStyle, width: 100 }}>刷新</div>
      <div className={style.item}>address: {address}</div>
      <div className={style.item}>balance: {balance} ETH</div>
      <div className={style.item}>usdt balance: {tokenBalance} USDT</div>

      <div onClick={handleSentETH} style={{ ...btnStyle, width: 200 }}>Sent 0.01 usdt</div>
      {state === StateType.LODING ? <div style={{ marginTop: 20 }}>交易进行中</div> : null}
      {state === StateType.FINISH ? <div style={{ marginTop: 20 }}>交易已完成</div> : null}
      {tx.length > 0 ? <a target='_blank' href={`https://goerli.etherscan.io/tx/${tx}`} style={{ ...btnStyle, width: 200 }}>查看交易详情</a> : null}
    </div>
  );
}