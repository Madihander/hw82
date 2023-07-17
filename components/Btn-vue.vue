<template>
    <button>{{this.data}}</button>
</template>

<script>
export default {
    data() {
    },
    props: {
        data: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
button {
    margin-bottom: 0.5rem;
    font-family: Roboto,sans-serif;
    color: #272946;
    background-color: #ffffff;
    border: 3px solid #eda031;
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 22px;
    font-weight: 700;
    transition: 0.6s;
}
button:hover{
    box-shadow: 0 0 20px 10px #eda031;
}
button:active{
    background-color:#272946;
    color: #ffffff;
    box-shadow:0 0 20px 10px #272946;
}
</style>