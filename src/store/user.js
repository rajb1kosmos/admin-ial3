import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: "",
    emailAddress: "",
    mobileNumber: "",
    sessionId: "",
    communityId: "",
    publicKey: "",
    userId: "",
    ial: 0,
    dId: "",
    firstName: "",
    lastName: "",
    aal: "",
    pptCountryCode: "",
    pptDateOfBirth: "",
    pptDateOfExpiry: "",
    pptDocumentId: "",
    pptDocumentType: "",
    pptFirstName: "",
    pptGender: "",
    pptLastName: "",
    pptPersonalNumber: "",
    dlAddress: "",
    dlCity: "",
    dlCountry: "",
    dlDateOfBirth: "",
    dlDateOfExpiry: "",
    dlDateOfIssue: "",
    dlDocumentId: "",
    dlEyeColor: "",
    dlFirstName: "",
    dlHeight: "",
    dlLastName: "",
    dlMiddleName: "",
    dlSex: "",
    dlState: "",
    dlZipCode: "",
    scep_creds: "",
    deviceId: "",
    dl_front_image: "",
    dl_back_image: "",
    ppt_image: "",
    liveid: "",
    nationalid_front_image: "",
    nationalid_back_image: "",
    location_lat: "",
    location_lon: "",
  }),

  getters: {
    getUserDetails(state) {
      return state.user;
    },

    getUser(state) {
      return {
        emailAddress: state.emailAddress,
        mobileNumber: state.mobileNumber,
        sessionId: state.sessionId,
        communityId: state.communityId,
        publicKey: state.publicKey,
        userId: state.userId,
        ial: state.ial,
        dId: state.dId,
        firstName: state.firstName,
        lastName: state.lastName,
        aal: state.aal,
        pptCountryCode: state.pptCountryCode,
        pptDateOfBirth: state.pptDateOfBirth,
        pptDateOfExpiry: state.pptDateOfExpiry,
        pptDocumentId: state.pptDocumentId,
        pptDocumentType: state.pptDocumentType,
        pptFirstName: state.pptFirstName,
        pptGender: state.pptGender,
        pptLastName: state.pptLastName,
        pptPersonalNumber: state.pptPersonalNumber,
        dlAddress: state.dlAddress,
        dlCity: state.dlCity,
        dlCountry: state.dlCountry,
        dlDateOfBirth: state.dlDateOfBirth,
        dlDateOfExpiry: state.dlDateOfExpiry,
        dlDateOfIssue: state.dlDateOfIssue,
        dlDocumentId: state.dlDocumentId,
        dlEyeColor: state.dlEyeColor,
        dlFirstName: state.dlFirstName,
        dlHeight: state.dlHeight,
        dlLastName: state.dlLastName,
        dlMiddleName: state.dlMiddleName,
        dlSex: state.dlSex,
        dlState: state.dlState,
        dlZipCode: state.dlZipCode,
        scep_creds: state.scep_creds,
        deviceId: state.deviceId,
        dl_front_image: state.dl_front_image,
        dl_back_image: state.dl_back_image,
        ppt_image: state.ppt_image,
        liveid: state.liveid,
        nationalid_front_image: state.nationalid_front_image,
        nationalid_back_image: state.nationalid_back_image,
        location_lat: state.location_lat,
        location_lon: state.location_lon,
        vc_employee: state.vc_employee,
      };
    },

    getLoggedIn(state) {
      return state.sessionId !== "";
    },

    getHasDL(state) {
      return state.dlDocumentId !== "" && state.dlFirstName !== "";
    },

    getCreateDetails(state) {
      return [
        state.dlFirstName,
        state.dlLastName,
        state.emailAddress,
        state.mobileNumber,
      ];
    },

    getUserID(state) {
      return state.userId;
    },

    getGameIdetity(state) {
      return state.gameIdentify;
    },
  },

  actions: {
    async setUserDetails(arg) {
      this.user = arg;
    },

    async setGameIdentity(arg) {
      this.gameIdentify = arg;
    },

    async setUserEmail(emailAddress) {
      this.emailAddress = emailAddress;
    },

    async setUserMobile(mobileNumber) {
      this.mobileNumber = mobileNumber;
    },

    async setUser(user) {
      this.sessionId = user.sessionId;
      this.communityId = user.communityId;
      this.publicKey = user.publicKey;
      this.userId = user.userId;
      this.ial = user.ial;
      this.dId = user.dId;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.aal = user.aal;
      this.pptCountryCode = user.pptCountryCode;
      this.pptDateOfBirth = user.pptDateOfBirth;
      this.pptDateOfExpiry = user.pptDateOfExpiry;
      this.pptDocumentId = user.pptDocumentId;
      this.pptDocumentType = user.pptDocumentType;
      this.pptFirstName = user.pptFirstName;
      this.pptGender = user.pptGender;
      this.pptLastName = user.pptLastName;
      this.pptPersonalNumber = user.pptPersonalNumber;
      this.dlAddress = user.dlCity;
      this.dlCity = user.dlCity;
      this.dlCountry = user.dlCountry;
      this.dlDateOfBirth = user.dlDateOfBirth;
      this.dlDateOfExpiry = user.dlDateOfExpiry;
      this.dlDateOfIssue = user.dlDateOfIssue;
      this.dlDocumentId = user.dlDocumentId;
      this.dlEyeColor = user.dlEyeColor;
      this.dlFirstName = user.dlFirstName;
      this.dlHeight = user.dlHeight;
      this.dlLastName = user.dlLastName;
      this.dlMiddleName = user.dlMiddleName;
      this.dlSex = user.dlSex;
      this.dlState = user.dlState;
      this.dlZipCode = user.dlZipCode;
      this.scep_creds = user.scep_creds;
      this.deviceId = user.deviceId;
      this.dl_front_image = user.dl_front_image;
      this.dl_back_image = user.dl_back_image;
      this.ppt_image = user.ppt_image;
      this.liveid = user.liveid;
      this.nationalid_front_image = user.nationalid_front_image;
      this.nationalid_back_image = user.nationalid_back_image;
      this.location_lat = user.location_lat;
      this.location_lon = user.location_lon;
      this.vc_employee = user.vc_employee;
    },

    async removeUser() {
      this.emailAddress = "";
      this.mobileNumber = "";
      this.sessionId = "";
      this.communityId = "";
      this.publicKey = "";
      this.userId = "";
      this.ial = "";
      this.dId = "";
      this.firstName = "";
      this.lastName = "";
      this.aal = "";
      this.pptCountryCode = "";
      this.pptDateOfBirth = "";
      this.pptDateOfExpiry = "";
      this.pptDocumentId = "";
      this.pptDocumentType = "";
      this.pptFirstName = "";
      this.pptGender = "";
      this.pptLastName = "";
      this.pptPersonalNumber = "";
      this.dlAddress = "";
      this.dlCity = "";
      this.dlCountry = "";
      this.dlDateOfBirth = "";
      this.dlDateOfExpiry = "";
      this.dlDateOfIssue = "";
      this.dlDocumentId = "";
      this.dlEyeColor = "";
      this.dlFirstName = "";
      this.dlHeight = "";
      this.dlLastName = "";
      this.dlMiddleName = "";
      this.dlSex = "";
      this.dlState = "";
      this.dlZipCode = "";
      this.scep_creds = "";
      this.deviceId = "";
      this.dl_front_image = "";
      this.dl_back_image = "";
      this.ppt_image = "";
      this.liveid = "";
      this.nationalid_front_image = "";
      this.nationalid_back_image = "";
      this.location_lat = "";
      this.location_lon = "";
      this.vc_employee = "";
    },
  },
});