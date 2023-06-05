<template>
  <div>
    <Start-Game v-if="isStarted" v-on:startGame="startGame($event)" />
    <div v-if="isGameStarted" class="container" style="margin-top: 5%;">
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
        v-on:actions="this.gameActions($event)"
        :cards="cards"
        :backCard="backCard"
        :kartSayisi="kartSayisi"
      />
    </div>
    <div v-if="isLose">
      <Lose v-on:startGame="this.startGame($event)" />
    </div>
    <Win v-if="isWin" v-on:startGame="this.startGame($event)" />
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
        let isGameStarted = computed(()=>store.state.isGameStarted);
        let isStarted = computed(()=>store.state.isStarted);
        let isLose = computed(()=>store.state.isLose)
        let isWin = computed(()=>store.state.isWin)

        //Funksiyonlar

        function startGame(){
          store.dispatch('startGame')
        }
        function updateGameSettings(gameSettings){
            store.dispatch('updateGameSettings',gameSettings)
        };
        function secimHakkiUpdate(){
            store.dispatch('secimHakki',1)
        }
        function winnerCard(name){
        if(this.kazananKart === name){
                setTimeout(()=>{
                    if(this.kazananKart == name){
                        store.dispatch('isWin')
                    }
                },1000)
            }
        }
        function gameActions(name, hak){
          store.dispatch('gameAction', name, hak)
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
            isGameStarted,
            isLose,
            isWin,
            isStarted,
            startGame,
            winnerCard,
            gameActions

        }
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
