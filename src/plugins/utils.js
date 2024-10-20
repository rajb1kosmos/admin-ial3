import goSDK from "../services/goSDK";

export const DefaultValue = (obj, prop, dv) => {
  if (obj) {
    if (prop in obj) {
      return obj[prop];
    }
  }
  return dv;
};

export const MaskValue = (t, n) => {
  if (t !== "") {
    const x = t.length;
    if (x > n) {
      const a = new Array(x - n);
      return t.substr(0, n) + a.join("X");
    }
  }
  return t;
};

export const IsEmpty = (t) => {
  return t.trim().length < 1;
};

export const IsCorp = () => {
  const t = goSDK.community;
  if (t === "banking1k") {
    return false;
  }
  return true;
};

export const CreateUserName = (fName, lName) => {
  let u = "";
  if (!IsEmpty(fName) && !IsEmpty(lName)) {
    u =
      fName[0] +
      lName[0] +
      new Date().getMilliseconds().toString() +
      new Date().getMilliseconds().toString()[0];
  } else {
    u =
      new Date().getMilliseconds().toString() +
      new Date().getMilliseconds().toString()[0];
  }
  return `${IsCorp() ? "corp" : "1bank"}${u}`;
};
