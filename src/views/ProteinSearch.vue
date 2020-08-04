<template>
  <v-main>
    <v-container>
      <searchTable
      :searchString="searchStr"
      :taxcode="taxcode"
      />
    </v-container>
  </v-main>
</template>

<script>
import store from '@/store/store.js'
import searchTable from  '@/components/ProteinSearchTable'
export default {
  components: {
    searchTable
  },
  props: {
  },
  data: () => ({
    searchStr: '',
    taxcode: 9606
  }),
  methods: {
    setStoreSearchString: function() {
      store.dispatch({
        type: 'setSearchString',
        value: this.searchStr
      });
    }
  },
  computed: {
  },
  watch: {
    '$route.params.searchString': function(str) {
      this.searchStr = str;
      this.setStoreSearchString();
     },
     '$store.state.cookie': function(str) {
      this.taxcode = str;
     }
  },
  mounted() {
    this.searchStr = this.$route.params.searchString;
    this.taxcode = this.$cookie.get('organism');
    this.setStoreSearchString();
  }
}
</script>
<style lang="scss">
</style>
