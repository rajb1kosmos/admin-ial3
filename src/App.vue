<script setup>
import { ref, onMounted, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useNotifyStore } from "./store/notify";
import { useUserStore } from "./store/user";

const router = useRouter();
const notifyStore = useNotifyStore();
const userStore = useUserStore();

const goToHome = () => {
  router.push("/");
  setTimeout(() => {
    window.location.reload();
  }, 700);
};

const goToSignUp = () => {
  router.push("/signup");
};

const logout = () => {
  userStore.removeUser();
  router.push("/");
};

let status = computed(() => {
  return notifyStore.getStatus;
});

let notification = computed(() => {
  return notifyStore.getNotificationData;
});

let user = computed(() => {
  return userStore.getUser;
});
</script>

<template>
  <v-snackbar v-model="status" :color="notification.type" :timeout="6000">
    {{ notification.text }}
  </v-snackbar>
  <div>
    <!-- <div class="header">
      <div class="head">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/images/1Kosmos-logo.svg"
          @click="goToHome"
        />
      </div>
      <h4 class="username">{{ user.userId }}</h4>
      <button v-if="user.userId === ''" class="red-btn" @click="goToSignUp()">
        Login
      </button>
      <button v-else class="red-btn" @click="logout()">Logout</button>
    </div> -->
    <div class="base">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #fff;
  display: flex;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
  padding: 0.6vw 2vw;
  align-items: center;
}

.head {
  display: flex;
  align-items: center;
  flex: 1;
}

.logo {
  width: 8.8vw;
}

/* .base:before {
  content: "";
  background: url("@/assets/images/thumb.png");
  background-position: center top 15%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100vh - 9vh);
  width: 100%;
  filter: brightness(0) saturate(100%) invert(67%) sepia(16%) saturate(403%)
    hue-rotate(108deg) brightness(45%) contrast(263%);
  opacity: 0.2;
} */

.base {
  /* background: linear-gradient(
    180deg,
    rgba(247, 249, 250, 0.9) 5%,
    rgba(255, 255, 255, 0.4) 50%
  ); */
  
  height: 100%;
  /* padding: 3vw; */
  background-color: rgb(242, 247, 246);
  /* backdrop-filter: blur(10.2px); */
  /* -webkit-backdrop-filter: blur(10.2px); */
}

.username {
  margin-right: 1vw;
}

.red-btn {
  background: #ee0000;
  border-radius: 3px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.7vw;
  padding: 0.5vw 0;
  width: 8vw;
}

.red-btn:disabled {
  background: #a6a6a6;
  border-radius: 3px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.7vw;
  padding: 0.5vw 0;
  width: 100%;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .logo {
    width: 40vw;
  }
}
</style>
