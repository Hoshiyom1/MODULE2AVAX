import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [atm, setATM] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const atmABI = atm_abi.abi;

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }

        if (ethWallet) {
            const account = await ethWallet.request({ method: "eth_accounts" });
            handleAccount(account);
        }
    };

    const handleAccount = (account) => {
        if (account) {
            console.log("Account connected: ", account);
            setAccount(account);
        } else {
            console.log("No account found");
        }
    };

    const connectAccount = async () => {
        if (!ethWallet) {
            alert("MetaMask wallet is required to connect");
            return;
        }

        const accounts = await ethWallet.request({
            method: "eth_requestAccounts",
        });
        handleAccount(accounts);

        // once wallet is set we can get a reference to our deployed contract
        getATMContract();
    };

    const getATMContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const atmContract = new ethers.Contract(
            contractAddress,
            atmABI,
            signer
        );

        setATM(atmContract);
    };

    const getBalance = async () => {
        if (atm) {
            setBalance((await atm.getBalance()).toNumber());
        }
    };

    const deposit = async (amount) => {
        if (atm) {
            let tx = await atm.deposit(amount);
            await tx.wait();
            getBalance();
        }
    };

    const withdraw = async (amount) => {
        if (atm) {
            let tx = await atm.withdraw(amount);
            await tx.wait();
            getBalance();
        }
    };

    const burnAllCoins = async () => {
        if (atm) {
            let tx = await atm.burnAllCoins(1, { gasLimit: 2000000 }); // Call the burnAllCoins with the manual gas limit
            await tx.wait();
            getBalance();
        }
    };

    const initUser = () => {
        // Check to see if user has Metamask
        if (!ethWallet) {
            return <p>Please install Metamask in order to use this ATM.</p>;
        }

        // Check to see if user is connected. If not, connect to their account
        if (!account) {
            return (
                <button
                    className="btn btn-outline btn-info"
                    onClick={connectAccount}
                >
                    Connect your Metamask wallet
                </button>
            );
        }

        if (balance == undefined) {
            getBalance();
        }

        return (
            <div>
                <p className="mb-4 text-lg font-bold">
                    Your Balance: {balance}
                </p>

                <div className="bg-slate-800 rounded-md p-6">
                    <h2 className="text-2xl font-bold">Deposit</h2>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(1)}
                        >
                            Deposit 1 ETH
                        </button>
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(5)}
                        >
                            Deposit 5 ETH
                        </button>
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(10)}
                        >
                            Deposit 10 ETH
                        </button>
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(25)}
                        >
                            Deposit 25 ETH
                        </button>
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(50)}
                        >
                            Deposit 50 ETH
                        </button>
                        <button
                            className="btn btn-active btn-primary"
                            onClick={() => deposit(100)}
                        >
                            Deposit 100 ETH
                        </button>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">Withdraw</h2>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-warning me-2"
                            onClick={() => withdraw(1)}
                        >
                            Withdraw 1 ETH
                        </button>
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => withdraw(5)}
                        >
                            Withdraw 5 ETH
                        </button>
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => withdraw(10)}
                        >
                            Withdraw 10 ETH
                        </button>
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => withdraw(25)}
                        >
                            Withdraw 25 ETH
                        </button>
                        <button
                            className="btn btn-warning mx-2"
                            onClick={() => withdraw(50)}
                        >
                            Withdraw 50 ETH
                        </button>
                        <button
                            className="btn btn-warning ms-2"
                            onClick={() => withdraw(100)}
                        >
                            Withdraw 100 ETH
                        </button>
                    </div>
                </div>

                <p className="mt-b text-lg font-bold text-slate-500 text-center">
                    {account}
                </p>

                <div className="mt-4 flex justify-center">
                    <button
                        className="btn btn-error"
                        onClick={() => burnAllCoins()}
                    >
                        Burn All
                    </button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <main className="text-white w-screen h-screen flex flex-col justify-center items-center">
            {/* bg-gray-900  */}
            <script src="https://cdn.tailwindcss.com"></script>
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@4.4.2/dist/full.min.css"
                rel="stylesheet"
                type="text/css"
            />
            <script src="https://cdn.tailwindcss.com"></script>

            <header className="text-center">
                <h1 className="text-6xl font-bold text-info">
                    HOSHIYOMI COINS ☄️
                </h1>
            </header>

            {initUser()}
            <style jsx>
                {`
                    main {
                        background-image: url("/wallpaper.png");
                        background-size: cover;
                    }
                    .container {
                        text-align: center;
                    }
                `}
            </style>
        </main>
    );
}
