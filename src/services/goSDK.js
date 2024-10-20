import axios from "axios";
import { useNotifyStore } from "../store/notify";
import json from "./Json14Sep2024.json";
const notifyStore = useNotifyStore();

const api = import.meta.env.VITE_API_URL;
export default {
  async generateSession(community, request) {
    try {
      const resp = await axios.post(`${api}/session/create`, request, {
        headers: {
          licensekey: "d45df581-77c5-4926-940e-09001bc4aad2",
          community: community,
          tenant: "demo3-pilot.1kosmos.net",
          "Content-Type": "application/json",
        },
      });
      return resp.data;
    } catch (error) {
      notifyStore.showNotification({
        text: error.message,
        type: "error",
      });
    }
  },

  async pollSession(id) {
    const resp = await axios.get(`${api}/session/poll`, {
      headers: {
        licensekey: "d45df581-77c5-4926-940e-09001bc4aad2",
        community: "corporate",
        tenant: "demo3-pilot.1kosmos.net",
        "Content-Type": "application/json",
      },
      params: {
        sessionID: id,
      },
    });
    // console.log(resp.data);
    return resp.data;
  },

  async sendEmail(request) {
    try {
      const resp = await axios.post(`${api}/otp/generate`, request, {
        headers: {
          licensekey: "d45df581-77c5-4926-940e-09001bc4aad2",
          community: "corporate",
          tenant: "demo3-pilot.1kosmos.net",
          "Content-Type": "application/json",
        },
      });
      return resp.data;
    } catch (error) {
      notifyStore.showNotification({
        text: error.message,
        type: "error",
      });
    }
  },

  async getUserData(request, Authmodule) {
    const resp = await axios.post(
      `${api}/user-mgmt/fetch`,
      {
        authModule: Authmodule,
        // 626fe148b52002001aee6d2a
        // 66068db7631df049be5966d8
        pIndex: 0,
        pSize: 25,
        query: { username: request },
        attributes: [],
      },
      {
        headers: {
          licensekey: "d45df581-77c5-4926-940e-09001bc4aad2",
          community: "corporate",
          tenant: "demo3-pilot.1kosmos.net",
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  },

  async getMeData(request) {
    const resp = await axios.get(
      `https://uwldemo.blockid.co:8451/proofing/next/${request}`,
      // `uwldemo.blockid.co:8451/proofing/next/testuser1@blockiddemo.com`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data
    // return json
  },
};
