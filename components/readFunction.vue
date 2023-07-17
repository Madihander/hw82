<template>
    <h2>{{title}}</h2>
    <Btn @click="onClick" data="call"></Btn>
</template>

<script>
import Btn from "@/components/Btn-vue.vue";

export default {
    name: "readFunction.vue",
    components: {Btn},
    props:{
        title:{
            type:String,
            required:true,
        },
        onClick:{
            type:Function,
            required:true,
        },
    }
}
</script>

<style scoped>

</style>