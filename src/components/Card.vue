<template>
  <div class="image-container" @gameSettings="gameSettings">
    <div class="cards" v-for="(card, index) in cards" :key="index">
      <div
        class="card-inner"
        :class="{ flipped: card.flipped }"
        @click="gameAction(card)"
      >
        <img class="card-front" :src="card.imgUrl" />
        <img class="card-back" :src="backCard" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    cards:{
      type:Array,
    },
    backCard:{
      type:String,
    },
    kartSayisi:{
      type:Number,
    },
    signal:{
      type:Number,
    }
  },
  created(){
    for(let i = 0; i < this.cards.length; i++){
      this.cards[i].flipped = true
    }
  },
  methods:{

    gameAction(card){
      card.flipped = false;;
      this.$emit('actions',card.name, 1)
    },

    flipCard(card){

        this.$emit('secimHakkiUpdate',1)
        this.winnerCard(card.name);

    },
    winnerCard(name){
      this.$emit('winnerCard',name)
    }
  },
  watch:{
    cards(){
      this.$emit('')
    }
  }
};
</script>

<style>
.cards {
  width: 100px;
  height: 150px;
  perspective: 1000px;
}
.cards:hover{
  cursor:url('assets/img/cursor.png')

}
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
.image-container {
      display: flex;
      justify-content: center;
      margin-top:5rem;
      gap:30px
    }

    .image-container img {
      cursor:pointer;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 10px;
    }
    .image-container img:hover{
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    }
</style>
