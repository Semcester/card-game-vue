<template>
  <div class="startGame">
    <img @click="startGame" src="/assets/img/start-game.png" alt="" />
  </div>
</template>

<script>
import Button from 'primevue/button';
export default{
    props:{
        isStarted:{
            type: Boolean,
        }
    },

    components:{
        Button
    },
    methods:{
        startGame(){
            this.$emit('startGame', true)
        }
    }
}
</script>

<style scoped>
.startGame{
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -10;
}
.btn{
    position: absolute;
    top: 50%;
}
img{
    width: 40%;
    height: 40%;
    cursor: pointer;
}
</style>
