<template>
  <div>
    <Button @click="toggleSidebar" label="Ayarlar" severity="secondary" text />
    <div v-if="showSidebar" class="sidebar" :class="{ active: showSidebar }">
      <span class="close" @click="showSidebar = false">X</span>
      <form class="gameForm" @submit.prevent="saveGameSettings">
        <div>
          <label for="kartSayısı">Kart sayısı:</label>
          <select
            id="kartSayısı"
            name="kartSayısı"
            value="kazananKart"
            v-model="gameSettings.kartSayisi"
            @change="saveGameSettings"
          >
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
        <div>
          <label for="kazananKart">Kazanan Kart: </label>
          <select
            id="kazananKart"
            name="kazananKart"
            v-model="gameSettings.kazananKart"
          >
            <option
              v-for="(option, i) in kazananKartOptions"
              :key="i"
              value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkbox"
            name="sureli"
            v-model="gameSettings.sureli"
          />
          <label for="checkbox">Check the box</label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>

import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
export default {
    props:['kazananKartOptions','kazananKart'],

    components:{
        Button,
        Dropdown
    },
    data(){
       return {
         showSidebar:false,
         gameSettings:{
            kartSayisi: 4,
            kazananKart: 'Kupa Kızı',
            sureli:false,
         }
       }
    },
  methods:{
    toggleSidebar() {
     this.showSidebar = !this.showSidebar;
    },
    saveGameSettings(){
        this.$emit('changeGameSettings', this.gameSettings)
    },
  },
}
</script>

<style scoped>

.sidebar {
  position: fixed;
 ;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-image: url("/assets/img/playGameBg.jpeg");
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.sidebar.active {
  transform: translateX(0);
}

.content {
  margin-right: 320px; /* Adjust this value to give space for the sidebar */
  transition: margin 0.3s ease;
}

.sidebar.active + .content {
  margin-right: 0;
}

.gameForm{
    margin:40px;
    display: flex;
    flex-direction: column;
    gap:15px;
}
label{
    margin-right: 10px;
}
.close{
    margin-left:10px;
    margin-top: 40px;
    cursor: pointer;
}
</style>
