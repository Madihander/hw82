<template>
    <Btn @click="this.connectWallet" data="Connect Wallet"/>
    <div><h5>{{}}</h5></div>
  <!--    <Btn @click="this.connectContract" data="Connect Contract"/>-->
    <FormDeploy v-show="isWalletConnected"></FormDeploy>

    <div>
        <CallFunction v-show="isContractConnected" :read-functions="readFunctions"/>
    </div>

</template>

<script>
import {mapActions} from "vuex";
// import {ethers} from 'ethers'
import FormDeploy from "@/components/FormDeploy.vue";
import Btn from "@/components/Btn-vue.vue";
import CallFunction from "@/components/CallFunction.vue";

export default {
    components: {FormDeploy, Btn, CallFunction},
    data() {
        return {
            readFunctions: [
                {title: 'name()', func: this.callName},
                {title: 'symbol()', func: this.callSymbol},
                {title: 'decimals()', func: this.callDecimals},
                {title: 'totalSupply()', func: this.callTotalSupply},
            ],
            writeFunctions: [
                {title: 'allowance()', func: this.callAllowance, inputs:2},
                {title: 'decreaseAllowance'}
            ]
        }
    },
    methods: {
        ...mapActions(['connectWallet']),
        ...mapActions(['connectContract']),
        ...mapActions(['callName']),
        ...mapActions(['callSymbol']),
        ...mapActions(['callDecimals']),
        ...mapActions(['callTotalSupply']),
        ...mapActions(['callAllowance']),

    },
    computed: {
        isWalletConnected() {
            if(this.$store.state.chainId){
                return true;
            }
            return false;
        },
        isContractConnected(){
          if(this.$store.state.erc20Address){
              return true;
          }
          return false;
        }
    }
}
</script>

<style>
#app {
    font-family: Roboto, sans-serif;
}


</style>
