import { defineStore } from "pinia";

export const useNotifyStore = defineStore({
  id: "notify",
  state: () => ({
    status: false,
    text: "",
    // error, success, info, warning
    type: "",
  }),

  getters: {
    getStatus(state) {
      return state.status;
    },
    getNotificationData(state) {
      return { text: state.text, type: state.type };
    },
  },

  actions: {
    async showNotification(arg) {
      this.text = arg.text;
      this.type = arg.type;
      this.status = true;
      setTimeout(() => {
        this.status = false;
        this.text = "";
        this.type = "";
      }, 3000);
    },
  },
});
