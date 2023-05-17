// import request from '/@/utils/request';

import { useContext } from "@nuxtjs/composition-api";

export const infoApi = () => {
  const { $axios } = useContext();

  const getInfo = async (params?: object) => {
    const res = await $axios.get(`users/`);

    return res;
  };

  return {
    getInfo,
  };
};
