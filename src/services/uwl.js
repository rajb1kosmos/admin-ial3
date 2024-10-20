import QRCodeStyling from "qr-code-styling";
import goSDK from "./goSDK";
import { useSessionStore } from "../store/session";

const sessionStore = useSessionStore();

export var id = 0;
export let url = "";

export default {
  async generateSession(community, payload) {
    const resp = await goSDK.generateSession(community, payload);
    sessionStore.setSessionData(resp)
    sessionStore.setPollStatus(true)
    this.createQR(resp.url + "/session/" + resp.sessionId);
    this.url = resp.url + "/session/" + resp.sessionId;
    this.pollStart(resp.sessionId);
    return resp;
  },

  createQR(payload) {
    const qr = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: payload,
      // image: `${import.meta.env.VITE_BASE_URL}/qr-logo.png`,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      // dotsOptions: {
      //   color: "#EE0000",
      //   type: "extra-rounded",
      // },
      // cornersSquareOptions: {
      //   color: "#000000",
      //   type: "extra-rounded",
      // },
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
    } else {
      console.log(JSON.stringify(payload), `${qr.div} is unable to be found`);
    }
  },

  async pollStart(sessionID) {
    goSDK.pollSession(sessionID).then((res) => {
      console.log(res)
      if(res.status === 404 && sessionStore.getPollStatus){
        sessionStore.setPollData(res);
        setTimeout(() => {
          this.pollStart(sessionStore.getSessionData.sessionId)
          }, 5000);
        }
        if(res.status === 400){
          sessionStore.setPollData(res);
          }
        if(res.status === 200){
          sessionStore.setPollData(res);
        }
      });
  },

  async pollStop() {
    sessionStore.pollStatus = false
  },

  clearQRAndRefresh(community, payload) {
    this.generateSession(community, payload);
  },
};
