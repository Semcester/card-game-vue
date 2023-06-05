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
    isGameStarted: false,
    isStarted: true,
    isWin: false,
    isLose: false,
    kazananKartOptions: [],
  },
  mutations: {
    START_GAME(state) {
      state.isStarted = false;
      state.isGameStarted = true;
      state.isLose = false;
      state.isWin = false;
      state.secimHakki = 1;
      state.cards = cardsImage.slice(0, 4);
      for (let i = state.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]];
      }
      state.cards.forEach((card) => {
        state.kazananKartOptions.push(card.name);
      });
    },
    UPDATE_SETTINGS(state, gameSettings) {
      state.cards = cardsImage.slice(0, gameSettings.kartSayisi);
      for (let i = state.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]];
      }
      state.cards.forEach((element) => {
        element.flipped = true;
      });
      state.kazananKart = gameSettings.kazananKart;
      state.kartSayisi = gameSettings.kartSayisi;
      state.secimHakki = gameSettings.kartSayisi == 6 ? 2 : 1;

      switch (state.kartSayisi) {
        case 4:
          return (state.cards = cardsImage.slice(0, 4));
        case 6:
          return (state.cards = cardsImage.slice(0, 6));
        case 8:
          return (state.cards = cardsImage);
      }
      state.kazananKartOptions = [];
      state.cards.forEach((card) => {
        state.kazananKartOptions.push(card.name);
      });
    },
    GAME_ACTIONS(state, name, hak) {
      const win = () => {
        setTimeout(() => {
          state.isWin = true;
          state.isLose = false;
          state.isGameStarted = false;
          state.isStarted = false;
        }, 1000);
      };
      const lost = () => {
        setTimeout(() => {
          state.isLose = true;
          state.isWin = false;
          state.isGameStarted = false;
          state.isStarted = false;
        }, 1000);
      };

      if (name === state.kazananKart) {
        state.secimHakki -= 1;
        return win();
      } else {
        if (state.secimHakki > 0) {
          state.secimHakki--;
          if (state.secimHakki === 0) {
            return lost();
          }
        }
      }

      console.log(name, state.secimHakki);
    },

    WIN(state) {
      state.isWin = true;
      state.isStarted = false;
      state.isGameStarted = false;
    },
    SHUFFLE_CARDS(cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      this.cards;
    },
    UPDATE_SECIMHAKKI(state) {
      if (state.kartSayisi == 6) state.secimHakki = 2;
      else if (state.kartSayisi == 8) state.secimHakki = 3;
    },
    GAME_HAK(state, hak) {
      if (state.secimHakki == 1) {
        setTimeout(() => {
          state.isLose = true;
          state.isGameStarted = false;
          state.isStarted = false;
        }, 500);
      }
      state.secimHakki != 0 ? (state.secimHakki -= hak) : state.secimHakki;
    },
    UPDATE_TIME(state, sure) {
      if (sure) {
        state.kalanSure = 30;
        const timer = setInterval(() => {
          state.kalanSure--;
          if (state.kalanSure <= 0) {
            clearInterval(timer);
            state.isLose = true;
            state.isWin = false;
            state.isGameStarted = false;
            state.isStarted = false;
          }
        }, 1000);
      }
    },
  },
  actions: {
    startGame({ commit }) {
      commit("START_GAME");
    },
    updateGameSettings({ commit }, gameSettings, actions) {
      commit("UPDATE_SETTINGS", gameSettings, actions);
      commit("SHUFFLE_CARDS");
      commit("UPDATE_SECIMHAKKI");
      commit("UPDATE_TIME", gameSettings.sureli);
    },
    secimHakki({ commit }, hak) {
      commit("GAME_HAK", hak);
    },
    isWin({ commit }) {
      commit("WIN");
    },
    gameAction({ commit }, name, hak) {
      commit("GAME_ACTIONS", name, hak);
    },
    shuffle({ commit }, state) {
      commit("SHUFFLE_CARDS", state.cards);
    },
  },
});

export default store;
