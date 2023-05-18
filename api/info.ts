// import request from '/@/utils/request';
import { useContext } from "@nuxtjs/composition-api";

export function infoApi() {
  const { $axios } = useContext();
  $axios.setHeader("Content-Type", "application/json");

  const service = $axios.create({
    baseURL: "",
  });

  const getInfo = async () => {
    const res = await service({
      // https://data.epa.gov.tw/api/v2/aqx_p_432?sort=ImportDate%20desc&format=JSON
      url: "/api/aqx_p_432",
      method: "get",
      params: {
        api_key: "e8dd42e6-9b8b-43f8-991e-b3dee723a52d",
        limit: "1000",
      },
    }).catch((e) => {
      console.log(e);
    });

    return res;
  };

  return {
    getInfo,
  };
}
