import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import {signIn, useSession} from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import axios from 'axios';
import {Avatar, Button} from "@mui/material";
import { ethers } from "ethers";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {updateAttribute} from "../../controller/accountSlice";
import {deepPurple} from "@mui/material/colors";
function SignIn() {
    const {data: session, status} = useSession();
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { network, balance } = useAppSelector(state => state.account)
    const handleAuth = async () => {
        try {
            if (isConnected) {
                await disconnectAsync();
            }

            const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

            const userData = { address: account, chain: chain.id, network: 'evm' };
            if (chain.id !== 9000) {
                const { data } = await axios.post('/api/auth/request-message', userData, {
                    headers: {
                        'content-type': 'application/json',
                    },
                });

                const message = data.message;

                const signature = await signMessageAsync({ message });

                // redirect user after success authentication to '/user' page
                const { url } = await signIn('credentials', { message, signature, redirect: false, callbackUrl: window.location.pathname });
            }

            let provider = new ethers.providers.Web3Provider(window.ethereum);
            // @ts-ignore
            await window.ethereum.enable();
            let network = await provider.getNetwork();
            let balance = await provider.getBalance(
                account
            )

            dispatch(updateAttribute({key: "network", value: chain.id !== 9000 ? network.name : "Evmos Test"}))
            dispatch(updateAttribute({key: "chainId", value: network.chainId}))
            dispatch(updateAttribute({key: "balance", value: balance._hex }))
            dispatch(updateAttribute({key: "address", value: account }))
            /**
             * instead of using signIn(..., redirect: "/user")
             * we get the url from callback and push it to the router to avoid page refreshing
             */
            push(window.location.pathname);
        } catch (e) {
            console.log("Cancel or Reject connect:", e);
        }

    };
    const accountInfo = session ? <div className={"header-account"}>
        <div>
            <Avatar alt={network} sx={{ bgcolor: deepPurple[500], width: 24, height: 24 }} src={"/imgs/metamask.png"} />
        </div>
        <div style={{fontSize: "0.6rem"}}>
            <div>{
                balance ? parseFloat(ethers.utils.formatEther(balance)).toFixed(4) : ""
            }</div>
            <div>{
                //@ts-ignore
                session.user.address.slice(0, 3).concat("...").concat(session.user.address.slice(29, 32))
            } ({ network })</div>
        </div>


    </div> : <span>Login with Metamask</span>;
    return (

        <Button  onClick={() => handleAuth()} variant={"outlined"}>{
            accountInfo
        }</Button>

    );
}

export default SignIn;