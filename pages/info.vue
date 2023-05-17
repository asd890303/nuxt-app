<template>
  <div>
    <div>
      <button type="button" class="btn btn-primary" @click="fetchInfo">
        Fetch
      </button>
    </div>
    <div>
      <pre>{{ info }}</pre>
      {{ state?.date }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@nuxtjs/composition-api";
import { infoApi } from "@/api/info";

export default defineComponent({
  setup() {
    const { getInfo } = infoApi();
    const info = ref([]);

    const fetchInfo = async () => {
      const res = await getInfo();
      info.value = res.data;
    };

    const state = reactive({
      date: new Date(),
    });

    return {
      info,
      state,
      fetchInfo,
    };
  },
});
</script>
