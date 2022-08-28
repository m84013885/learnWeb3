# web3 开发前端入门

## 使用
* 下载项目
* 安装依赖 `npm i`
* 本地运行 `npm run dev`
* 创建 `.env` 文件
* 登录 [infura](https://infura.io/) 后注册帐号，创建项目后获取一个 `Ethereum` 的 `API KEY`，在项目根目录下创建一个 `.env`  文件，把 `VITE_INFURA_KEY=YOUR API KEY` 填写到 `.env` 文件中 
* 由于本文使用 `goerli` 测试网作为演示，因此刚生成的钱包可以在 https://goerlifaucet.com/ 中申请测试币
* 完成了内容的 1,2 步之后，你应该拥有了一个钱包，可以把 `VITE_PRIVATE_KEY=privateKey` 填写到 `.env` 文件中 

## 内容
1. 创建钱包
2. 导入钱包
3. 展示钱包信息
4. 转账操作
5. 和 *metamask* 交互