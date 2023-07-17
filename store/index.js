import {createStore} from 'vuex'
import {ContractFactory, ethers} from 'ethers'
import {ERC20Abi} from "@/contract/ERC20.abi.js";
import {ERC20Bin} from "@/contract/ERC20.bin.js";

let provider = new ethers.providers.Web3Provider(window.ethereum)

export default createStore({
    state: {
        address: "",
        chainId: "",
        erc20: {},
        erc20Address: "",
        name: "",
        symbol: "",
        transactionHash: "",
        errorCall: "",

    },
    getters: {
        getAddress: state => {
            return state.erc20Address
        },
        getName: state => {
            return state.name
        },
        getSymbol: state => {
            return state.symbol
        },
    },
    mutations: {},
    actions: {
        async connectWallet({state}) {
            if (window.ethereum !== "underfind") {
                console.log("Ethereum client installed")
                if (window.ethereum.isMetaMask === true) {
                    console.log("MetaMask installed")
                    if (window.ethereum.isConnected !== true) {
                        console.log("MetaMask is not connected")
                        await window.ethereum.enable()
                    }
                    console.log("Metamask connected")
                } else {
                    console.log("MetaMask is not installed")
                }
            } else {
                console.log("Ethereum client is not installed")
            }
            this.state.chainId = await window.ethereum.request({method: 'eth_chainId'});
            console.log("Chain Id:", this.state.chainId)

            window.ethereum.on('accountsChanged', (accounts) => {
                state.address = ethers.utils.getAddress(accounts[0])
            })

            window.ethereum.on('chainChanged', async () => {
                provider = ethers.providers.Web3Provider(window.ethereum)
                state.chainId = await window.ethereum.request({method: 'eth_chainId'});
                console.log('ChainId changed to ', state.chainId)
            })

        },
        // ADDRESS = "0x323750E227DC097A4aAF256f82134Ab740Da2F24"
        async deployContract({state},args) {
            console.log(args)
            let signer = provider.getSigner();
            const ERC20Factory = new ContractFactory(ERC20Abi, ERC20Bin, signer);
            const ERC20 = await ERC20Factory.deploy(args[0], args[1], Number(args[2]), Number(args[3]));
            await ERC20.deployed();
            state.erc20 = ERC20;
            state.erc20Address = state.erc20.address;
            state.name = await ERC20.name();
            state.symbol = await ERC20.symbol();
            await this.connectContract(state.erc20Address);
        },
        async connectContract({state}, address) {
            //0x323750E227DC097A4aAF256f82134Ab740Da2F24
            let signer = provider.getSigner();
            const ERC20 = new ethers.Contract(address, ERC20Abi, signer)
            state.erc20 = ERC20;
            state.erc20Address = ERC20.address;
            state.name = await ERC20.name();
            state.symbol = await ERC20.symbol();
        },

        async callName({state}) {
            alert(`Name: ${await state.erc20.name()}`);
        },
        async callSymbol({state}) {
            alert(`Symbol: ${await state.erc20.symbol()}`);
        },
        async callDecimals({state}) {
            alert(`Decimals: ${await state.erc20.decimals()}`);
        },
        async callTotalSupply({state}) {
            alert(`TotalSupply: ${await state.erc20.totalSupply()}`);
        },
        async callBalanceOf({state}, adr) {
            console.log(adr)
            alert(`BalanceOf: ${await state.erc20.balanceOf(adr)}`);
        },
        async callTransfer({state}, args) {
            try {
                const result = await state.erc20.transfer(args[0], Number(args[1]))
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash)
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
                state.errorCall = error.error.data.message;
            }
        },

        async callApprove({state},args) {
            try {
                const result = await state.erc20.approve(args[0],Number(args[1]));
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber)
                alert(state.transactionHash)
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
                state.errorCall = error.error.data.message;
            }
        },
        async callAllowance({state},args) {
            alert(await state.erc20.allowance(args[0],args[1]))
        },
        async callTransferFrom({state},args) {
            try {
                const result = await state.erc20.transferFrom(args[0],args[1],Number(args[2]))
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash);
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
            }
        },
        async callMint({state}, args) {
            try {
                const result = await state.erc20.mint(args[0],Number(args[1]))
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash)
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
                state.errorCall = error.error.data.message;
            }
        },
        async callBurn({state},amount) {
            try {
                const result = await state.erc20.burn(Number(amount));
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash)
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
                state.errorCall = error.error.data.message;
            }
        },
        async callIncreaseAllowance({state},args) {
            try {
                const result = await state.erc20.increaseAllowance(args[0],Number(args[1]))
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash)
            } catch (error) {
                console.log(error)
                alert(error.error.data.message);
                state.errorCall = error.error.data.message;
            }
        },
        async callDecreaseAllowance({state},args) {
            try {
                const result = await state.erc20.decreaseAllowance(args[0],Number(args[1]))
                result.wait();
                state.transactionHash = `https://testnet.bscscan.com/tx/${result.hash}`;
                alert(result.value._isBigNumber);
                alert(state.transactionHash);
            } catch (error) {
                console.log(error)
                alert(error.error.data.message)
                state.errorCall = error.error.data.message;
            }
        }

    },
    modules: {}
})
