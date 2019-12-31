<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-assests-table :assets="assets" v-if="!isLoading" />
  </div>
</template>
<script>
import PxAssestsTable from "@/components/PxAssestsTable";
import Api from "../api";

export default {
  name: "Home",
  components: {
    PxAssestsTable
  },
  data() {
    return {
      assets: [],
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;
    Api.getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  }
};
</script>