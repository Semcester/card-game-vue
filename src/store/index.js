import { createStore } from "vuex";
import cardsImage, { backCardImage } from "../data/data";

const store = createStore({
  state: {
    cards: cardsImage,
    backCard: backCardImage,
    kazananKart: "Kupa Kızı",
    kartSayisi: 4,
    secimHakki: 1,
    kalanSure: 0,
    isStartGame: true,
    isStarted: false,
    isWin: false,
    isLose: false,
  },
  getters: {},
  mutations: {
    UPDATE_SETTINGS(state, gameSettings) {
      state.cards = cardsImage.slice(0, gameSettings.kartSayisi);
      state.kazananKart = gameSettings.kazananKart;
      state.kartSayisi = gameSettings.kartSayisi;
      state.secimHakki = gameSettings.kartSayisi == 6 ? 2 : 1;
    },
    SHUFFLE_CARDS(state) {
      for (let i = state.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]];
      }
      this.state.cards;
    },
    UPDATE_SECIMHAKKI(state) {
      if (state.kartSayisi == 6) state.secimHakki = 2;
      else if (state.kartSayisi == 8) state.secimHakki = 3;
    },
    GAME_HAK(state, hak) {
      if (state.secimHakki == 0) return (state.isLose = true);
      state.secimHakki != 0 ? (state.secimHakki -= hak) : state.secimHakki;
      console.log("BITMESI GEREK", state.isLose);
    },
    UPDATE_TIME(state, sure) {
      if (sure) {
        state.kalanSure = 30;
        const timer = setInterval(() => {
          state.kalanSure--;
          if (state.kalanSure <= 0) {
            clearInterval(timer);
            state.isLose = true;
          }
        }, 1000);
      }
    },
  },
  actions: {
    updateGameSettings({ commit }, gameSettings, actions) {
      commit("UPDATE_SETTINGS", gameSettings, actions);
      commit("SHUFFLE_CARDS");
      commit("UPDATE_SECIMHAKKI");
      commit("UPDATE_TIME", gameSettings.sureli);
    },
    secimHakki({ commit }, hak) {
      commit("GAME_HAK", hak);
    },
    shuffle({ commit }, state) {
      commit("SHUFFLE_CARDS", state.cards);
    },
  },
});

export default store;
