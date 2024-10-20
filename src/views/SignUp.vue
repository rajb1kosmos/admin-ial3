<script setup>
import BlockIDAuth from "../components/BlockIDAuth.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
// import { useMq } from "vue3-mq";

// const mq = useMq();
// const showQR = computed(() => mq.current === "sm");
const router = useRouter();

const guide = ref(null);
const tab = ref("one");

const openDialog = () => {
  guide.value.openDialogGuide();
};
</script>

<template>
  <div class="sign-in-container">
    <div class="info-section">
      <img src="@/assets/images/side-img.png" alt="" />
    </div>
    <div class="sign-in">
      <div class="account">
        <h3>Don't have an account</h3>
        <v-btn variant="outlined" class="account-btn" disabled> Get Started </v-btn>
      </div>
      <div class="sign-in-section">
        <h1 class="sign-in-header">Sign in</h1>
      </div>
      <v-tabs
        v-model="tab"
        color="#ee0000"
        hide-slider="true"
        density="compact"
      >
        <v-tab value="one" :ripple="false" variant="plain" class="tabs"
          >QR CODE</v-tab
        >
        <v-tab value="two" :ripple="false" variant="plain" class="tabs"
          >USERNAME</v-tab
        >
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <div class="tab-section">
            <img
              src="@/assets/images/1Kosmos-logo.svg"
              class="qr-logo"
              alt=""
            />
            <BlockIDAuth
              authType="fingerprint"
              scopes="did,userId,ial,firstname,lastname,email"
              successPath="/dashboard"
              community="corporate"
            ></BlockIDAuth>
            <h5 class="qr-invite">Request an invite</h5>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <div class="tab-section">
            <img
              src="@/assets/images/1Kosmos-logo.svg"
              class="qr-logo"
              alt=""
            />
            <v-text-field
              label="Userid"
              density="compact"
              variant="outlined"
              disabled
            ></v-text-field>
            <v-checkbox label="Remember me on this device" disabled></v-checkbox>
            <v-btn variant="outlined" disabled class="next-btn" color="#ee0000"> Next </v-btn>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>

      <div class="app-link">
        <h4>Don't have an app?</h4>
        <a>IOS</a>
        <a>Android</a>
      </div>

      <div class="terms">
        <h6>
          ©2024 <a class="terms-link">1Kosmos</a> Inc., All Rights Reserved |
          <a class="terms-link">Privacy Policy</a>. Unauthorized copying or
          distribution of this software is strictly prohibited. This instance of
          the software (Version
          1.10.09.02.36ea6ec1983acc561c60c333feeea0ea42c8666f.1725036603) is
          licensed for exclusive use by BlockID.
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-in-container {
  display: flex;
}

/* Intro Slot */

.sign-in {
  flex: 2.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.account {
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-right: 3vw;
}

.account h3 {
  margin-right: 1vw;
  font-size: 0.9vw;
}

.account-btn {
  text-transform: capitalize;
  font-size: 0.9vw;
  letter-spacing: 0px;
}

.sign-in-section {
  text-align: center;
}

.sign-in-header {
  font-weight: 600;
  font-size: 2.3vw;
  color: #000000;
  line-height: 2.8vw;
  margin: 0.5vw 0 1vw 0;
  font-family: "Work Sans", sans-serif;
}

.tab-section {
  background-color: #ffffff;
  text-align: center;
  padding: 2.5vw 3.5vw;
  border-radius: 0.5vw;
  margin-top: 1.2vw;
}

.qr-logo {
  width: 8vw;
  margin-bottom: 1vw;
}

.qr-invite {
  font-size: 1.1vw;
  color: #414141;
  cursor: pointer;
  margin-top: 1vw;
}

.next-btn{
  width: 100%;
}

.app-link {
  display: flex;
  justify-content: space-between;
}

.app-link h4 {
  margin: 2vw 0.5vw;
}

.app-link a {
  margin: 2vw 0.5vw;
  color: rgb(28, 137, 182);
}

.app-link a:hover {
  color: rgb(28, 137, 182);
  background-color: transparent;
  cursor: pointer;
}

.terms {
  text-align: center;
}

.terms-link {
  color: #551a8b;
  text-decoration: underline;
  font-weight: bold;
}

/* Side Image */

.info-section {
  background-color: #1e0a3b;
  color: #ffffff;
  /* padding: 2.6vw 2vw; */
  /* box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1); */
  /* border-radius: 1.5vw 1.5vw 1.5vw 0px; */
  flex: 1;
  display: flex;
  justify-content: center;
}

.info-section img {
  width: 85%;
}

.mobile {
  display: none !important;
}

.desktop {
  display: block !important;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .mobile {
    display: block !important;
  }

  .desktop {
    display: none !important;
  }

  /* Intro Slot */
  .intro-subheader {
    font-weight: 600;
    font-size: 4.7vw;
    color: #ee0000;
    margin: 0.5vw 0 1vw 0;
    text-align: center;
  }

  .intro-header {
    font-weight: 600;
    font-size: 8.3vw;
    color: #000000;
    line-height: unset;
    margin: 0.5vw 0 1vw 0;
    text-align: center;
  }

  .intro-content {
    font-weight: 500;
    font-size: 3.8vw;
    color: #777777;
    text-align: center;
  }

  .qr-section {
    position: absolute;
    top: 7vw;
    right: 33vw;
  }

  .info-section {
    background-color: #1e0a3b;
    color: #ffffff;
    padding: 8vw 7vw;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 1.5vw 1.5vw 1.5vw 0px;
  }

  .info-section h4 {
    font-size: 4.7vw;
  }

  .info-image {
    /* background-image: url("@/assets/images/coffee.png"); */
    width: 100vw;
    filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.15));
    border-radius: 1.5vw 1.5vw 1.5vw 0px;
    background-size: cover;
    background-position: unset;
    text-align: center;
    position: relative;
    height: 100%;
  }

  .mobile-image {
    text-align: center;
    height: 100%;
  }

  .mobile-image img {
    width: 100vw;
    left: 0;
    height: 100%;
  }

  .info-header {
    font-size: 0.7vw;
    font-weight: 700;
  }

  .info-points {
    display: flex;
    margin: 3.9vw 0;
  }

  .info-points h5 {
    font-size: 3.8vw;
  }

  .info-points img {
    margin: 0 2vw 0 0;
  }

  .qr-code {
    width: 10.41vw;
  }

  .bubble-pointer-one {
    display: flex;
    align-items: center;
    flex-direction: column;
    /* margin: 0 0 0 1.5vw; */
  }

  .bubble-pointer-two {
    position: absolute;
    top: 103vw;
    left: 42vw;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
  }

  .bubble-pointer-one h4 {
    width: 40vw;
    font-size: 3vw;
    color: #000000;
  }

  .bubble-pointer-two h4 {
    width: 40vw;
    font-size: 3vw;
    color: #000000;
  }

  .bubble-one {
    background: #ee0000;
    border-radius: 5vw 5vw 5vw 5vw;
    height: 10vw;
    width: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bubble-one span {
    font-weight: 600;
    font-size: 4vw;
    line-height: 1.8vw;
    color: #ffffff;
  }

  .bubble-two {
    background: #ee0000;
    border-radius: 5vw 5vw 5vw 0;
    height: 10vw;
    width: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bubble-two span {
    font-weight: 600;
    font-size: 4vw;
    line-height: 1.8vw;
    color: #ffffff;
  }

  .next-btn {
    position: absolute;
    bottom: 2.6vw;
    right: 2.08vw;
  }

  .red-btn {
    background: #ee0000;
    border-radius: 2.15vw;
    color: #ffffff;
    font-weight: 600;
    font-size: 4.7vw;
    padding: 1.8vw 7vw;
    margin: 2vw 0;
    width: 75%;
  }

  .red-btn:disabled {
    background: #a6a6a6;
    border-radius: 2.15vw;
    color: #ffffff;
    font-weight: 600;
    font-size: 4.7vw;
    padding: 1.8vw 7vw;
    margin: 2vw 0;
    width: 75%;
  }

  .options {
    text-align: center;
    margin: 2vw 0;
  }
}
</style>
