<template>
    <form @submit.prevent style="border:4px solid #eda031; padding: 0 0 15px 15px">
        <h1>Form for deploy standard ERC20 Token</h1>
        <p>Name:</p>
        <InputDeploy v-model="this.deployData.name"/>

        <p>Symbol:</p>
        <InputDeploy v-model="this.deployData.symbol"/>

        <p>Decimals:</p>
        <InputDeploy v-model="this.deployData.decimals"/>

        <p>Amount:</p>
        <InputDeploy v-model="this.deployData.amount"/>
        <br><br>
        <Btn @click="this.deploy" data="Deploy"/>
        <br><br>
        <InputDeploy v-model="this.connectAddres"/>
        <Btn @click="this.connectContract(this.connectAddres)" data="Connect Contract"/>

    </form>
</template>

<script>
import InputDeploy from './InputDeploy.vue';
import Btn from "@/components/Btn-vue.vue";
import {mapActions} from "vuex";

export default {
    components: {InputDeploy, Btn},
    data() {
        return {
            deployData: {
                name: "",
                symbol: "",
                decimals: "",
                amount: "",
            },
            connectAddres: "",
        }
    },
    methods: {
        ...mapActions(['deployContract']),
        ...mapActions(['connectContract']),
        deploy() {
            this.deployContract([
                this.deployData.name.trim(),
                this.deployData.symbol.trim(),
                this.deployData.decimals,
                this.deployData.amount,
            ])

        }
    }
}
</script>

<style>
p {
    margin-bottom: 0.5rem;
    font-size: 26px;
    font-weight: 600;
    color: #272946;
}
</style>