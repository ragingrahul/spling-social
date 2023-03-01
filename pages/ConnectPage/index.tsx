import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { SocialProtocol } from "@spling/social-protocol";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import styles from '@/styles/Home.module.css'
import {
    FileData,
    ProtocolOptions,
    User,
    Post,
} from "@spling/social-protocol/dist/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';

const inter = Inter({ subsets: ['latin'] })

const options = {
    rpcUrl:
        "https://rpc.helius.xyz/?api-key=002d43b6-4f76-47c2-b4e1-9c87c9a6e3d2",
    useIndexer: true,
} as ProtocolOptions;

const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);


export default function ConnectPage() {



    const [socialProtocol, setSocialProtocol] = useState<SocialProtocol>();
    const [walletAddress, setWalletAddress] = useState<WalletContextState>();
    const [userInfo, setUserInfo] = useState<User | null>();
    const [status, setStatus] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>();
    const [isFeatured, setIsFeatured] = useState<boolean>(true);

    const solanaWallet = useWallet();


    useEffect(() => {
        setWalletAddress(solanaWallet);

        const initialize = async () => {
            if (walletAddress?.wallet?.adapter?.publicKey) {
                const socialProtocol: SocialProtocol = await new SocialProtocol(
                    solanaWallet,
                    null,
                    options
                ).init();
                setSocialProtocol(socialProtocol);

                //     const promise = async () => {
                //       if (walletAddress?.wallet?.adapter?.publicKey) {
                //         const user = await socialProtocol.getUserByPublicKey(
                //           walletAddress?.wallet?.adapter?.publicKey
                //         );
                //         setUserInfo(user);
                //         if (user?.bio) {
                //           let bios: any = JSON.parse(user?.bio);
                //           setBio(bios);
                //         }
                //       }
                //     };
                //     toast.promise(promise(), {
                //       pending: "Initializing",
                //       success: "Profile Initialized",
                //       error: "Error Initializing",
                //     });
            }
        };
        initialize();
    }, [solanaWallet, walletAddress]);
    return (

        <div className='w-full h-screen  bg-[#F8FFE9]'>
            <div className=' flex justify-center items-center flex-col h-screen '>
                <div className='border-[#166F00] border-[1px] rounded-[26px] p-20'>
                    <h2 className="text-2xl text-center">Welcome to Spling Gym</h2>
                    <div className='items-center justify-center'><WalletMultiButtonDynamic /></div>
                    <p className="text-center">
                        Connect your phantom wallet to continue
                    </p>
                </div>

            </div>

        </div>
    )
}