<template>
    <div style="border:4px solid #eda031; padding: 0 0 15px 15px; margin-top: 15px">
        <p>Token: {{ contractName }}</p>
        <p>Symbol: {{ contractSymbol }}</p>
        <p>Address: {{ contractAddress }}</p>
        <br>
        <div v-for="(block,index) in readFunctions" :key="index">
            <readFunction :title="block.title" :onClick="block.func"/>
        </div>

        <h2>balanceOf()</h2>
        <h3>account(address)</h3>
        <InputDeploy id="adrBalOf"/>
        <Btn @click="callERCBalOf" data="Send"></Btn>

        <h2>mint()</h2>
        <h3>to(address)</h3>
        <InputDeploy id="toMint"/>
        <h3>amount(uint256)</h3>
        <InputDeploy id="amountMint"/>
        <Btn @click="callERCMint" data="Send"></Btn>

        <h2>burn()</h2>
        <h3>amount(uint256)</h3>
        <InputDeploy id="amountBurn"/>
        <Btn @click="callERCBurn" data="Send"></Btn>

        <h2>transfer()</h2>
        <h3>to(address)</h3>
        <InputDeploy id="toTransfer"/>
        <h3>amount(uint256)</h3>
        <InputDeploy id="amountTransfer"/>
        <Btn @click="callERCTransfer" data="Send"></Btn>

        <h2>approve()</h2>
        <h3>spender(address)</h3>
        <InputDeploy id="spenderApprove"/>
        <h3>amount(uint256)</h3>
        <InputDeploy id="amountApprove"/>
        <Btn @click="callERCApprove" data="Send"></Btn>

        <h2>allowance()</h2>
        <h3>owner(address)</h3>
        <InputDeploy id="ownerAllowance"/>
        <h3>spender(address)</h3>
        <InputDeploy id="spenderAllowance"/>
        <Btn @click="callERCAllowance" data="Send"></Btn>

        <h2>transferFrom()</h2>
        <h3>from(address)</h3>
        <InputDeploy id="fromTransFrom"/>
        <h3>to(address)</h3>
        <InputDeploy id="toTransFrom"/>
        <h3>amount(uint256)</h3>
        <InputDeploy id="amountTransFrom"/>
        <Btn @click="callERCTransferFrom" data="Send"></Btn>

        <h2>increaseAllowance()</h2>
        <h3>sender(address)</h3>
        <InputDeploy id="senderIncrease"/>
        <h3>addValue(uint256)</h3>
        <InputDeploy id="addValueIncrease"/>
        <Btn @click="callERCIncAllowance" data="Send"></Btn>

        <h2>decreaseAllowance()</h2>
        <h3>sender(address)</h3>
        <InputDeploy id="senderDecrease"/>
        <h3>subtractValue(uint256)</h3>
        <InputDeploy id="subValueDecrease"/>
        <Btn @click="callERCDecAllowance" data="Send"></Btn>
    </div>
</template>

<script>
import InputDeploy from "@/components/InputDeploy.vue";
import Btn from "@/components/Btn-vue.vue";
import readFunction from "@/components/readFunction.vue";
import {mapActions} from "vuex";

export default {
    name: "CallFunction.vue",
    components: {InputDeploy, Btn, readFunction},
    data() {
        return {}
    },
    props: {
        readFunctions: {
            type: Array,
            required: true,
        }
    },
    methods: {
        ...mapActions(['callBalanceOf']),
        ...mapActions(['callMint']),
        ...mapActions(['callBurn']),
        ...mapActions(['callTransfer']),
        ...mapActions(['callApprove']),
        ...mapActions(['callAllowance']),
        ...mapActions(['callTransferFrom']),
        ...mapActions(['callIncreaseAllowance']),
        ...mapActions(['callDecreaseAllowance']),
        callERCBalOf() {
            this.callBalanceOf(document.getElementById('adrBalOf').value)
            document.getElementById('adrBalOf').value = ''
        },
        callERCMint() {
            let to = document.getElementById('toMint').value;
            let amount = document.getElementById('amountMint').value;
            console.log(to)
            console.log(amount)
            this.callMint([to.trim, amount])
            to = '';
            amount = '';
        },
        callERCBurn() {
            let amount = document.getElementById('amountBurn').value;
            console.log(amount)
            this.callBurn(amount)
            amount = '';
        },
        callERCTransfer() {
            let to = document.getElementById('toTransfer').value;
            let amount = document.getElementById('amountTransfer').value;
            console.log(to)
            console.log(amount)
            this.callTransfer([to.trim(), amount])
            to = '';
            amount = '';
        },

        callERCApprove() {
            let spender = document.getElementById('spenderApprove').value;
            let amount = document.getElementById('amountApprove').value;
            this.callApprove([spender.trim(), amount])
            spender = '';
            amount = '';
        },
        callERCAllowance() {
            let owner = document.getElementById('ownerAllowance').value.trim();
            let spender = document.getElementById('spenderAllowance').value.trim();
            console.log(owner);
            console.log(spender);
            this.callAllowance([owner,spender])
            owner = '';
            spender = '';
        },
        callERCTransferFrom() {
            let from = document.getElementById('fromTransFrom').value.trim();
            let to = document.getElementById('toTransFrom').value.trim();
            let amount = document.getElementById('amountTransFrom').value.trim();
            this.callTransferFrom([from,to,amount])
            from = '';
            to = '';
            amount = '';
        },

        callERCIncAllowance() {
            let sender  = document.getElementById('senderIncrease').value;
            let addValue  = document.getElementById('addValueIncrease').value;
            this.callIncreaseAllowance([sender.trim(), addValue])
            sender = '';
            addValue = '';
        },

        callERCDecAllowance() {
            let sender  = document.getElementById('senderDecrease').value;
            let subtractValue  = document.getElementById('subValueDecrease').value;
            this.callDecreaseAllowance([sender.trim(), subtractValue])
            sender = '';
            subtractValue = '';
        },

    },
    computed: {
        contractAddress() {
            return this.$store.getters.getAddress;
        },
        contractName() {
            return this.$store.getters.getName;
        },
        contractSymbol() {
            return this.$store.getters.getSymbol;
        },
    }
}
</script>

<style scoped>

</style>