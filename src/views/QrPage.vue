<script setup>
import BlockIDAuth from "../components/BlockIDAuth.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed, watch, inject } from "vue";
import { useNotifyStore } from "../store/notify";
import { useUserStore } from "../store/user";
import goSDK from "../services/goSDK";
import QRCodeStyling from "qr-code-styling";

// import { useMq } from "vue3-mq";

// const mq = useMq();
// const showQR = computed(() => mq.current === "sm");
const notifyStore = useNotifyStore();
const userStore = useUserStore();
const router = useRouter();
const userEmail = ref();

let getUser = computed(() => {
  return userStore.getUser;
});

onMounted(async () => {
  // Fetch User from different authmodule
  const userData = await goSDK.getUserData(
    getUser.value.userId,
    "65b79e39e1b02fe44fde08a1"
  );

  if (userData.hasOwnProperty("code") || userData.data.length === 0) {
    if (userData.hasOwnProperty("data") && userData.data.length === 0) {
      // "Not found";
      notifyStore.showNotification({
        text: `User name not found`,
        type: "error",
      });
    } else {
      // "Something went wrong";
      notifyStore.showNotification({
        text: `Something went wrong, please contact administrator`,
        type: "error",
      });
    }
  } else {
    if (userData.data.length !== 0 && userData.data[0].uid !== "") {
      userEmail.value = userData.data[0].email;
      generateQRCode();
    }
  }
});

const generateQRCode = async () => {
  const qr = await new QRCodeStyling({
    width: 150,
    height: 150,
    type: "svg",
    data: userEmail.value,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "H",
    },
    backgroundOptions: {
      color: "#FFFFFF",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 2,
    },
  });
  const qrEl = document.getElementById("qrCode");
  if (qrEl) {
    qrEl.innerHTML = "";
    qr.append(document.getElementById("qrCode"));
    console.log(qr);
  } else {
    console.log(JSON.stringify(payload), `${qr.div} is unable to be found`);
  }
};

const logout = () => {
  router.push("/");
  window.location.reload();
};
</script>

<template>
  <div class="main-container">
    <div class="logo">
      <img src="@/assets/images/1Kosmos-logo.svg" class="qr-logo" alt="" />
    </div>
    <div class="container">
      <div class="content">
        <div class="kiosk-image">
          <img src="@/assets/images/machine.svg" class="qr-logo" alt="" />
        </div>
        <div class="verification-info">
          <h2>Proceed to a Verification Kiosk</h2>
          <div class="qr-code">
            <div id="qrCode"></div>
          </div>
          <p class="instructions">
            Present this QR code at a Kiosk. Carry two documents that can prove
            your identity
          </p>
          <p class="instructions-light">
            Our Verification Kiosks are designed to support our customers who
            prefer in-person verification.
          </p>
          <div class="helpful-links">
            <h4>Helpful Links</h4>
            <p>
              <a href="#">Which documents can I use to prove my identity?</a>
            </p>
            <p><a href="#">Find a Verification Kiosk Near Me</a></p>
          </div>

          <v-btn
            variant="flat"
            color="#ee0000"
            class="enroll-btn"
            size="large"
            @click="logout"
          >
            Done
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}
.container {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.logo {
  text-align: left;
  /* padding: 20px; */
  /* background-color: white; */
}
.logo img {
  height: 4vw;
}
.content {
  display: flex;
  /* padding: 20px; */
}
.kiosk-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/images/finger-img.svg");
  padding: 5vw 0 0 0;
}
.kiosk-image img {
  width: 70%;
  border-radius: 8px;
}
.verification-info {
  flex: 1;
  padding: 2vw;
  text-align: center;
}
h2 {
  color: #ff0000;
  margin-top: 0;
  font-size: 1.6vw;
  text-align: center;
  font-weight: bold;
}
.qr-code {
  text-align: center;
  margin: 20px 0;
}
.qr-code img {
  width: 150px;
  height: 150px;
}
.instructions {
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}
.instructions-light {
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
}
.helpful-links {
  font-size: 14px;
  text-align: center;
}
.helpful-links h4 {
  font-size: 18px;
}
.helpful-links a {
  font-size: 14px;
  color: #0000ff;
  text-decoration: none;
}

.enroll-btn {
  margin-top: 1vw;
  width: 30%;
  font-weight: bold;
}
</style>
