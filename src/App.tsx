import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import { Index } from "./router"
import { CreateWallet } from "./router/createWallet"
import { ImportWallet } from "./router/importWallet"
import { WalletPage } from "./router/wallet"
import { TrcWallet } from "./router/trcWallet"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      {/* trc钱包调试 */}
      <Route path="/trcWallet" element={<TrcWallet />}></Route>
      <Route path="/create" element={<CreateWallet />}></Route>
      <Route path="/import" element={<ImportWallet />}></Route>
      <Route path="/wallet" element={<WalletPage />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
