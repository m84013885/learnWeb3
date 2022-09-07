
import { useEffect, useState } from "react";
// usdt测试币token
const tokenAddress = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
const sendAddress = "TBitR8KYo6ycwMgVkHmh53LXbHrQ4nkLMV";
export const TrcWallet = () => {
    // 连接状态
    const [login, setLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        linkTrc()
    }, [])

    const linkTrc = async () => {
        if (!window.tronLink) {
            return false
        }
        interface requestAccountsResponse {
            code: Number, // 200：ok，4000：在队列中，不需要重复提交， 4001：user rejected
            message: String
        }
        const res: requestAccountsResponse = await window.tronLink.request({ method: 'tron_requestAccounts' })
        if (res.code === 200) {
            setLogin(true)
        }
    }

    const handleSent = async () => {
        if (loading) {
            return false
        }
        if (login) {
            setLoading(true)
            const contract: any = await window.tronWeb.contract().at(tokenAddress);
            // 使用 call 来执行 pure 或 view 智能合约方法。这些方法不会修改区块链，也不会花费任何执行成本，也不会向网络广播。
            // 获取名称测试
            const result = await contract.name().call();
            console.log('result: ', result);
            contract.transfer(sendAddress, 5000000).send({
                feeLimit: 100_000_000,
                callValue: 0,
                shouldPollResponse: true
            }).then(() => {
                setLoading(false)
                console.log('succ')
            }).catch(() => {
                setLoading(false)
                console.log('fail')
            })
        } else {
            linkTrc()
        }
    }
    return (
        <div>
            <div style={{ padding: 30, cursor: 'pointer' }} onClick={handleSent}>转账5USDT</div>
        </div>
    );
}