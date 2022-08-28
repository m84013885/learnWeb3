import { Link } from "react-router-dom"

const styles = { marginLeft: 20, marginTop: 10, marginBottom: 10 }
export const btnStyle = {
  padding: 20,
  width: 80,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  color: '#fff',
  marginTop: 20,
  backgroundColor: 'green',
  cursor: 'pointer'
}
export const Index = () => {
  return (
    <div style={{ padding: 30 }}>
      <p>整个项目使用了主要展示</p>
      <ul style={{ marginLeft: 20, marginTop: 20 }}>
        <li><Link to={'/create'}>创建钱包</Link></li>
        <li><Link to={'/import'}>导入钱包</Link></li>
        <ul style={styles}>
          <li>助记词</li>
          <li>密钥</li>
        </ul>
        <li><Link to={'/wallet'}>钱包信息</Link></li>
        <ul style={styles}>
          <li>地址</li>
          <li>余额</li>
          <li>token 余额</li>
        </ul>
        <li>转账操作</li>
        <ul style={styles}>
          <li>ETH 转账</li>
          <li>token 转账</li>
        </ul>
        <li>和 metamask 插件交互</li>
      </ul>
    </div>
  )
}