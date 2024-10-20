<script setup>
import { ref, onMounted, onUnmounted, defineProps, computed, watch } from "vue";
import { DefaultValue } from "../plugins/utils";
import uwl from "../services/uwl";
import { useUserStore } from "../store/user";
import { useNotifyStore } from "../store/notify";
import { useSessionStore } from "../store/session";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  authType: {
    type: String,
    default: "Fingerprint",
  },

  community: {
    type: String,
    default: "idproofing",
  },

  scopes: {
    type: String,
    default: "firstname,lastname,did,userIdList,ial,userId",
  },

  successPath: {
    type: String,
    default: "/",
  },

  responsiveMode: {
    type: String,
    default: "desktop",
  },

  qrID: {
    type: String,
    default: "qrCode",
  },
});

const userStore = useUserStore();
const notifyStore = useNotifyStore();
const sessionStore = useSessionStore();

// const bid = IsCorp() ? BlockIDSDK : BankBID;
const route = useRoute();
const router = useRouter();
const user = ref({});
let pollData = ref();
const isDefault = ref(false);
let sessionInActive = ref(false)

const getPath = computed(() => route.path);

watch(() => {
  pollData.value = sessionStore.getPollData;
  // console.log(pollData.value);
  if (pollData.value.status === 200) {
    sessionStore.clearPoll()
    user.value = pollData.value;
    console.log(user.value.user_data.userid)
    userStore
      .setUser({
        sessionId: user.value.sessionId,
        communityId: DefaultValue(user.value.account_data, "communityId", ""),
        publicKey: user.value.publicKey,
        userId: DefaultValue(user.value.user_data, "userid", ""),
        ial: DefaultValue(user.value, "ial", "1"),
        dId: DefaultValue(user.value, "did", ""),
        firstName: DefaultValue(user.value.user_data, "firstname", ""),
        lastName: DefaultValue(user.value.user_data, "lastname", ""),
        aal: DefaultValue(user.value, "aal", ""),
        pptCountryCode: DefaultValue(user.value.user_data.ppt, "country", ""),
        pptDateOfBirth: DefaultValue(user.value.user_data.ppt, "dob", ""),
        pptDateOfExpiry: DefaultValue(user.value.user_data.ppt, "doe", ""),
        pptDocumentId: DefaultValue(user.value.user_data.ppt, "documentId", ""),
        pptDocumentType: DefaultValue(
          user.value.user_data.ppt,
          "documentType",
          ""
        ),
        pptFirstName: DefaultValue(user.value.user_data.ppt, "firstName", ""),
        pptGender: DefaultValue(user.value.user_data.ppt, "gender", ""),
        pptLastName: DefaultValue(user.value.user_data.ppt, "lastName", ""),
        pptPersonalNumber: DefaultValue(
          user.value.user_data.ppt,
          "personalNumber",
          ""
        ),
        dlAddress: DefaultValue(user.value.user_data.dl, "address", "Mumbai"),
        dlCity: DefaultValue(user.value.user_data.dl, "city", ""),
        dlCountry: DefaultValue(user.value.user_data.dl, "country", ""),
        dlDateOfBirth: DefaultValue(user.value.user_data.dl, "dob", ""),
        dlDateOfExpiry: DefaultValue(user.value.user_data.dl, "doe", ""),
        dlDateOfIssue: DefaultValue(user.value.user_data.dl, "doi", ""),
        dlDocumentId: DefaultValue(user.value.user_data.dl, "documentId", ""),
        dlEyeColor: DefaultValue(user.value.user_data.dl, "eyeColor", ""),
        dlFirstName: DefaultValue(user.value.user_data.dl, "firstName", ""),
        dlHeight: DefaultValue(user.value.user_data.dl, "height", ""),
        dlLastName: DefaultValue(user.value.user_data.dl, "lastName", ""),
        dlMiddleName: DefaultValue(user.value.user_data.dl, "middleName", ""),
        dlSex: DefaultValue(user.value.user_data.dl, "gender", ""),
        dlState: DefaultValue(user.value.user_data.dl, "state", ""),
        dlZipCode: DefaultValue(user.value.user_data.dl, "zipCode", ""),
        scep_creds: DefaultValue(user.value, "scep_creds", ""),
        location: DefaultValue(user.value, "location", ""),
        deviceId: DefaultValue(user.value, "deviceId", ""),
        dl_front_image: DefaultValue(
          user.value.user_data,
          "dl_front_image",
          ""
        ),
        dl_back_image: DefaultValue(user.value.user_data, "dl_back_image", ""),
        ppt_image: DefaultValue(user.value.user_data, "ppt_image", ""),
        liveid: DefaultValue(user.value.user_data, "liveid", ""),
        vc_employee: DefaultValue(user.value.user_data, "vc_employee", "{}"),
        nationalid_front_image: DefaultValue(
          user.value,
          "nationalid_front_image",
          ""
        ),
        nationalid_back_image: DefaultValue(
          user.value,
          "nationalid_back_image",
          ""
        ),
        location_lat: DefaultValue(user.value.user_data.location, "lat", ""),
        location_lon: DefaultValue(user.value.user_data.location, "lon", ""),
      })
      .then(() => {
        notifyStore.showNotification({
          text: `Successfully Authenticated!`,
          type: "success",
        });
        if (getPath.value === "/game-order") {
          userStore.setGameIdentity(true);
        }
        if (
          user.value.user_data.userid ||
          getPath.value === "/scan-driving-license"
        ) {
          success(props.successPath);
        } else {
          userStore.removeUser();
          notifyStore.showNotification({
            text: `Invalid Credintial. Please use correct credintial or persona`,
            type: "warning",
          });
          uwl.clearQRAndRefresh(props.community, {
            authType: props.authType,
            scopes: props.scopes,
          });
        }
      })
      .catch((reason) => {
        console.warn(reason);
        userStore.removeUser();
        notifyStore.showNotification({
          text: `What happened this is the StartAuth Catch ${reason}`,
          type: "error",
        });
      });
    }
  if (pollData.value.status === 400) {
    sessionStore.clearPoll()
    sessionInActive.value = true
  }
});

const refreshQR = () => {
  sessionInActive.value = false
  // location.reload()
  uwl.clearQRAndRefresh(props.community, {
    authType: props.authType,
    scopes: props.scopes,
  });
}


const success = (u) => {
  if (u) {
    if (u.startsWith("http", 0)) {
      window.open(u, "_blank");
    } else if (u.startsWith("/", 0)) {
      router.push(u);
    }
  }
};

const checkType = () => {
  switch (props.authType.toLowerCase()) {
    case "fingerprint":
      return "Fingerprint";
    case "pin":
      return "Pin";
    case "face":
      return "Face";
    default:
      return "Fingerprint";
  }
};

onMounted(() => {
  isDefault.value = props.scopes === "firstname,lastname,did,userIdList,ial";
  startAuth();
});

const startAuth = async () => {
  console.log("StartAuth");
  uwl.authType = checkType();
  uwl.scopes = props.scopes;
  await uwl.generateSession(props.community, {
    authType: uwl.authType,
    scopes: uwl.scopes,
  });
};

const goTOBlockIDApp = () => {
  console.log(uwl.url);
  window.open(uwl.url, "_blank", "noreferrer");
};

onUnmounted(() => {
  uwl.pollStop()
});
</script>

<template>
  <section>
    <section v-if="responsiveMode === 'desktop'" class="text-center desktop">
      <div v-if="!sessionInActive" :id="qrID"></div>
      <div v-else>
        <h4><b>Session is expired</b></h4>
        <button class="red-btn-fit" @click="refreshQR">
          Refresh
        </button>
      </div>  
    </section>
    <section v-if="responsiveMode === 'mobile'" class="text-center mobile">
      <button class="red-btn" @click="goTOBlockIDApp">
        Login with BlockID
      </button>
    </section>
  </section>
</template>

<style scoped>
.red-btn {
  background: #ee0000;
  border-radius: 0.15vw;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.7vw;
  padding: 0.5vw 0;  
  width: 25%;
}

.red-btn-fit {
  background: #ee0000;
  border-radius: 0.15vw;
  color: #ffffff;
  font-weight: 600;
  margin-top: 1vw;
  padding: 0.5vw 1vw;
  font-size: 0.7vw;
  width: fit-content;
}

.mobile {
  display: none !important;
}

.desktop {
  display: block !important;
}

@media only screen and (max-width: 600px) {
  .mobile {
    display: block !important;
  }

  .desktop {
    display: none !important;
  }
  .red-btn {
    background: #ee0000;
    border-radius: 2.15vw;
    color: #ffffff;
    font-weight: 600;
    font-size: 4.7vw;
    padding: 1.8vw 7vw;
    width: 100%;
  }
}
</style>
