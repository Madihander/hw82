<template>
    <input v-model="dataInput" type="text">
</template>

<script>
export default {
    data() {
        return {
            dataInput: "",
        }
    },
    methods: {
        inputType(event) {
            this.dataInput = event.target.value;
        }
    }
}
</script>

<style scoped>
input{
    margin-right: 10px;
    padding: 8px 5px;
    font-size: 22px;
    font-weight: 600;
    color:#272946;
    border: 3px solid #eda031;
    border-radius: 4px;
}
</style>