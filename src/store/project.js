import { defineStore } from "pinia";

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    proofData: {},
  }),

  getters: {
    getFullData(state) {
      return state.proofData;
    },

    getSpecificInfo(state) {
      return (type) => state.proofData[type];
    },

    getPassportAndDLData(state) {
      console.log(state);
      return (type) => {
        const data = Object.keys(state.proofData.IdentificationDocuments)
          .filter(
            (prop) =>
              state.proofData.IdentificationDocuments[prop].DocumentName ===
              type
          )
          .map((prop) => ({
            // prop: prop,
            DocumentName:
              state.proofData.IdentificationDocuments[prop].DocumentName,
            FirstName:
              state.proofData.IdentificationDocuments[prop].GivenName.Original,
            LastName:
              state.proofData.IdentificationDocuments[prop].Surname.Original,
            DataOfBirth: `${state.proofData.IdentificationDocuments[prop].BirthDate.Original.day} / ${state.proofData.IdentificationDocuments[prop].BirthDate.Original.month} / ${state.proofData.IdentificationDocuments[prop].BirthDate.Original.year}`,
            Address:
              state.proofData.IdentificationDocuments[prop].Address.Original,
            PostalCode:
              state.proofData.IdentificationDocuments[prop].PostalCode.Original,
            DocumentNumber:
              state.proofData.IdentificationDocuments[prop].DocumentNumber
                .Original,
            DataOfIssue: `${state.proofData.IdentificationDocuments[prop].IssueDate.Agent.day} / ${state.proofData.IdentificationDocuments[prop].IssueDate.Agent.month} / ${state.proofData.IdentificationDocuments[prop].IssueDate.Agent.year}`,
            DataExpiry: `${state.proofData.IdentificationDocuments[prop].ExpirationDate.Agent.day} / ${state.proofData.IdentificationDocuments[prop].ExpirationDate.Agent.month} / ${state.proofData.IdentificationDocuments[prop].ExpirationDate.Agent.year}`,
            ImageFront: state.proofData.IdentificationDocuments[prop].Images[0].Data,
            ImageBack: state.proofData.IdentificationDocuments[prop].Images[1].Data
          }));
        return data;
      };
    },

    getSSNData(state) {
      return () => {
        const result = [];

        for (const key in state.proofData.PersonalInfo) {
          if (typeof state.proofData.PersonalInfo[key] === "object") {
            for (const innerKey in state.proofData.PersonalInfo[key]) {
              if (
                typeof state.proofData.PersonalInfo[key][innerKey] === "object"
              ) {
                for (const innermostKey in state.proofData.PersonalInfo[key][
                  innerKey
                ]) {
                  result.push({
                    [innermostKey]:
                      state.proofData.PersonalInfo[key][innerKey][innermostKey],
                  });
                }
              } else {
                result.push({
                  [innerKey]: state.proofData.PersonalInfo[key][innerKey],
                });
              }
            }
          } else {
            result.push({ [key]: state.proofData.PersonalInfo[key] });
          }
        }

        return result;
      };
    },
  },

  actions: {
    async setFullData(arg) {
      this.proofData = arg;
    },
  },
});
