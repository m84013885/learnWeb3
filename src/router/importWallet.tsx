import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { btnStyle } from ".";
import style from './index.module.css';
export const ImportWallet = () => {
  const [nav, setNav] = useState(0);
  const [data, setData] = useState("")
  const [mnemonic, setMnemonic] = useState("")
  const [address, setAddress] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const handleNav = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setNav(Number(e.currentTarget.getAttribute('data-index')))
    setData('')
  }, [])
  const handleInput = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => setData(event.target.value), [])
  const handleImport = async () => {
    if (data === '') return
    if (nav === 0) {
      try {
        const wallet = await ethers.Wallet.fromMnemonic(data)
        setMnemonic(data);
        setAddress(wallet.address);
        setPrivateKey(wallet.privateKey);
        window.wallet = wallet
      } catch (error) {
        console.log(error);

      }
    }
    else {
      const wallet = new ethers.Wallet(data.startsWith('0x') ? data : '0x' + data)
      setAddress(wallet.address);
      setPrivateKey(wallet.privateKey);
      window.wallet = wallet
    }

  }
  return (
    <div style={{ padding: 30 }}>
      <p>通过记录的助记词 / 私钥来导入钱包</p>
      <div className={style.nav}>
        <div data-index={0} onClick={handleNav} className={nav === 0 ? style.navItemActive : style.navItem}>助记词</div>
        <div data-index={1} onClick={handleNav} className={nav === 1 ? style.navItemActive : style.navItem}>私钥</div>
      </div>
      <div className={style.textareaBox}>
        <textarea value={data} onChange={handleInput} placeholder={nav === 0 ? "输入助记词，使用空格隔开每一个单词" : '输入密钥'} className={style.textaree}></textarea>
      </div>
      <div onClick={handleImport} style={{ ...btnStyle, width: 200 }}>导入钱包</div>
      {privateKey === '' ? null : <>
        {
          mnemonic === '' ? null : <>
            <h3 style={{ marginTop: 20 }}>助记词</h3>
            <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{mnemonic}</div>
          </>
        }
        <h3 style={{ marginTop: 20 }}>地址</h3>
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{address}</div>
        <h3 style={{ marginTop: 20 }}>私钥</h3>
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>{privateKey}</div>
        <p style={{ marginTop: 10 }}>方便在下一个页面操作</p>
        <Link to={"/wallet"} style={{ ...btnStyle, width: 200 }}>进入钱包</Link>
      </>}
    </div>
  );
}