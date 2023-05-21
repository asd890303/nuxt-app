import { defineStore } from "pinia";

export const userStore = defineStore({
  id: "userStore",
  state: () => {
    return {
      followList: [] as Item[],
    };
  },
  actions: {
    addToFollowList(value: Item) {
      this.followList.push(value);
    },
    getFollowList() {
      return this.followList;
    },
  },
  getters: {
    filtersList: (state) => state.followList,
  },
});
