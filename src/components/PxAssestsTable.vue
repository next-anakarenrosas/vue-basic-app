<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{up: this.sortOrder == 1, down: this.sortOrder == -1}">
          <span 
          class="underline cursor-pointer"
          @click="changeSortOrder">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            id="filter"
            class="bg-gray-100 focus:outline-none borber-b border-gray-400 py-2 px-4 block"
            type="text"
            placeholder="...Buscar"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        v-for="asset in filteredAssets"
        :key="asset.id"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
        </td>
        <td>
          <b>#{{asset.rank}}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: asset.id } }"
          >{{asset.name}}</router-link>
          <small class="ml-1 text-gray-500">{{asset.symbol}}</small>
        </td>
        <td>{{asset.priceUsd | dollar}}</td>
        <td>{{asset.marketCapUsd | dollar}}</td>
        <td
          :class="asset.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'"
        >{{asset.changePercent24Hr | percent}}</td>
        <td class="hidden sm:block">
          <px-button @click="coinDetail(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxAssestsTable",
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: "",
      sortOrder: 1
    };
  },
  components: {
    PxButton
  },
  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          item =>
            item.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            item.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if(parseInt(a.rank) > parseInt(b.rank)){
            return this.sortOrder
          }
          return altOrder
        });
    }
  },
  methods: {
    changeSortOrder(){
      this.sortOrder = this.sortOrder == 1 ? -1 : 1
    },
    coinDetail(coinId) {
      this.$router.push({
        name: "coin-detail",
        params: {
          id: coinId
        }
      });
    }
  }
};
</script>
<style scoped >
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>