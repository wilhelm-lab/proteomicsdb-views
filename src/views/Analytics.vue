<template>
  <v-main>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-breadcrumbs :items="items"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col class="shrink">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
             :href="source"
             icon
             large
             target="_blank"
             v-on="on"
             >
             <v-icon large>mdi-code-tags</v-icon>
            </v-btn>
          </template>
          <span>Source</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
</template>

<script>
import router from '@/router';
export default {
  props: {
    source: String,
  },
  data: () => ({
    leftmenu: false,
    selectedTab: 0,
    left: false,
    items: [
    {
      text: 'Dashboard',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      text: 'Link 1',
      disabled: false,
      href: 'breadcrumbs_link_1',
    },
    {
      text: 'Link 2',
      disabled: true,
      href: 'breadcrumbs_link_2',
    }
    ],
  }),
  methods: {
    showHome: function(){
      router.push('/vue/home/').catch(()=>{});
    },
    showProteins: function(){
      router.push('/vue/protein/').catch(()=>{});
    }
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
