import { defineStore } from "pinia";

export const useUserInfo = defineStore("userInfo", {
  state: () => ({
    userInfos: {},
  }),
  actions: {
    async login(data: { account: string; password: string }) {},
    async setUserInfos() {},
  },
});
