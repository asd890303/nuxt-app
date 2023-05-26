import { defineStore } from "pinia";

export const useUseInfoStore = defineStore({
  id: "userInfo",
  state: () => {
    return {
      followList: [] as Item[],
    };
  },
  actions: {
    addToFollowList(item: Item) {
      this.filtersList.push(item);
    },
  },
  getters: {
    filtersList: (state) => state.followList,
  },
});
