<template>
  <v-container fluid>
    <v-row>
      <h1>{{this.proteinName}} - Projects</h1>
    </v-row>
    <v-row justify="space-around" align="center">
      <searchTable :proteinId="proteinId" :proteinAccession="proteinAccession"/>
      <router-view />
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import searchTable from '@/components/ProteinProjectTable'
export default {
  props: {
    proteinName: String,
    proteinId: String,
    proteinAccession: String
  },
  components: {
    searchTable
  },
  data: () => ({
    openPopUp: false
  }),
  methods: {
    closePopUp: function() {
      this.openPopUp = false;
    },
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
