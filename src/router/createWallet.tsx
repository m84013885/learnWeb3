import { btnStyle } from ".";
import { ethers } from "ethers";
import { entropyToMnemonic } from "ethers/lib/utils";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export const CreateWallet = () => {
  const [mnemonic, setMnemonic] = useState("")
  const [address, setAddress] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const handleCreate = async () => {
    const mnemonic = entropyToMnemonic(ethers.utils.randomBytes(16))
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic)
    setMnemonic(mnemonic);
    setAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
  }
  return (
    <div style={{ padding: 30 }}>
      <p>钱包本质就是一个通过各种加密算法创建的 <b>privateKey</b>，我们可以通过 <b>privateKey</b> 拿到整个钱包的权限</p>
      <p>但是为了方便记忆，我们一般采用助记词来创建钱包（关键词 bip39）</p>
      <div onClick={handleCreate} style={{ ...btnStyle, width: 200 }}>创建钱包</div>
      {mnemonic === '' ? null : <>
        <h3 style={{ marginTop: 20 }}>助记词</h3>
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{mnemonic}</div>
        <h3 style={{ marginTop: 20 }}>地址</h3>
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{address}</div>
        <h3 style={{ marginTop: 20 }}>私钥</h3>
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{privateKey}</div>
        <p style={{ marginTop: 10 }}>保存钱包，可以保存一份助记词，或者直接保存私钥</p>
        <p style={{ marginTop: 10 }}>记录下助记词，或者私钥，进入下一步</p>
      </>}
    </div>
  );
}