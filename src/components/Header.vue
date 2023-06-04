<template>
  <div>
    <div style="display: flex;flex-direction: row; gap:50px">
      <div class="info">
        <h3>Kalan Seçim Hakkı</h3>
        <h4>{{ secimHakki }}</h4>
      </div>
      <Divider layout="vertical" />
      <div class="info">
        <h3>Kazanan Kart</h3>
        <h3>{{kazananKart}}</h3>
      </div>
      <Divider layout="vertical" />
      <div class="info">
        <h3>Kalan Süre</h3>
        <h4>{{ kalanSure }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Divider from 'primevue/divider';

export default {
  components: { Sidebar, Divider },
  props:{
    kalanSure:{
      type:Number
    },
    secimHakki:{
      type:Number
    },
    kazananKart:{
      type:String
    }
  },

  data() {
    return {
      showSidebar:false
    };
  },
  methods:{
    toggleSidebar(){
      console.log('Hey')
    }
  }
};
</script>

<style scoped>
.info{
    display:flex;
    flex-direction:column;
    align-items:center;
}
.settings{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
