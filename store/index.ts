import { defineStore } from "pinia";

export const useUseInfoStore = defineStore({
  id: "userInfo",
  state: () => {
    return {
      followList: [] as Item[],
      fields: [] as Fields[],
    };
  },
  actions: {
    addToFollowList(item: Item) {
      this.filtersList.push({
        ...item,
        addTime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      });
    },
    setColFields(fields: Fields[]) {
      this.fields = fields;
    },
  },
  getters: {
    filtersList: (state) => state.followList,
  },
});
