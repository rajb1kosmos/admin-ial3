import { defineStore } from "pinia";

export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    pollData: "",
    session: "",
    pollStatus: false
  }),

  getters: {
    getPollData(state) {
      return state.pollData;
    },

    getSessionData(state){
      return state.session;
    },

    getPollStatus(state){
      return state.pollStatus;
    },
  },

  actions: {
    async setPollData(arg) {
      this.pollData = arg;
    },

    async clearPoll() {
      this.pollData = '';
    },

    async setPollStatus(arg) {
      this.pollStatus = arg;
    },

    async setSessionData(arg){
      this.session = arg;
    },

    async clearSessionData(){
      this.session = "";
    }
  },
});
