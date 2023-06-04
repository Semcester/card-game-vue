<template>
  <div>
    <Start-Game v-if="isStartGame" v-on:startGame="startGame($event)" />
    <div v-if="isStarted" class="container" style="margin-top: 5%;">
      <sidebar
        v-on:changeGameSettings="this.updateGameSettings($event)"
        class="side"
      />
      <Header
        :kalanSure="kalanSure"
        :secimHakki="secimHakki"
        :kazananKart="kazananKart"
      ></Header>
      <Card
        v-on:secimHakkiUpdate="this.secimHakkiUpdate($event)"
        v-on:winnerCard="winnerCard($event)"
        :cards="cards"
        :backCard="backCard"
        :kartSayisi="kartSayisi"
      />
    </div>
    <div v-if="isLose">
      <Lose />
    </div>
    <Win v-if="isWin" />
  </div>
</template>

<script>
import Header from './Header.vue'
import Card from './Card.vue'
import Sidebar from './Sidebar.vue'
import StartGame from './StartGame.vue'
import Lose from './Lose.vue';
import Win from './Win.vue';
import {useStore} from "vuex";
import {ref, computed} from 'vue';

export default {
    components:{
        Header,
        Card,
        Sidebar,
        StartGame,
        Lose,
        Win
    },
    setup(){
        const store = useStore()
        const cards = computed(()=> store.state.cards.slice(0,store.state.kartSayisi))
        let kazananKart = computed(()=>store.state.kazananKart);
        let secimHakki= computed(()=>store.state.secimHakki);
        let kalanSure = computed(()=>store.state.kalanSure)
        const backCard = ref(store.state.backCard);
        let kartSayisi = ref(4);
        let sureli = ref(false);
        let isStartGame = ref(true);
        let isStarted = ref(false)
        let isLose = computed(()=>store.state.isLose)
        let isWin = ref(false)
        function updateGameSettings(gameSettings){
            store.dispatch('updateGameSettings',gameSettings)
        };
        function secimHakkiUpdate(){
            store.dispatch('secimHakki',1)
        }
        return {
            cards,
            backCard,
            kazananKart,
            kartSayisi,
            sureli,
            secimHakki,
            kalanSure,
            updateGameSettings,
            secimHakkiUpdate,
            isStartGame,
            isLose,
            isWin,
            isStarted,
        }
    },
    created(){
    },
    methods:{
        winnerCard(name){
            if(this.kazananKart === name){
                setTimeout(()=>{
                    if(this.kazananKart == name){
                        this.isWin= true
                        this.isStarted= false;
                    }
                },1000)
            }
        },
        startGame(){
            this.isStarted = true;
            this.isStartGame = false
        },
    },
}
</script>

<style scoped>
.container{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:space-around;
    width: 100%;
    padding-right: calc(var(--section-gap) / 2);
}
.side{
   position:absolute;
   right: 10rem;
   top:5rem

}
</style>
