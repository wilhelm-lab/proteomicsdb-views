<template>
  <v-main>
  <v-container fluid>
    <v-row>
    <v-navigation-drawer
      v-model="leftMenu"
      expand-on-hover
      >
      <v-list shaped>
        <v-list-item-group v-model="selectedTab" color="accent" mandatory>
          <v-list-item @click="showProteins">
            <v-list-item-action>
              <v-icon>far fa-file-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Summary</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showProteins">
            <v-list-item-action>
              <v-icon>far fa-chart-bar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Peptides MS/MS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showProteins">
            <v-list-item-action>
              <v-icon>fas fa-chart-area</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>FDR estimation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showProteins">
            <v-list-item-action>
              <v-icon>mdi-apache-kafka</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Interaction network</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      <h1>EGFR - Protein Summary</h1>
      <v-col>
        <v-btn
             color="primary"
             style="right:80px;top:80px;"
             fixed dark top right
             fab small
             >
             <v-icon>fas fa-question</v-icon>
        </v-btn>
        <v-btn
             color="red"
             style="right:80px;top:130px;"
             fixed dark top right
             fab small
             >
             <v-icon>fas fa-bug</v-icon>
        </v-btn>
        <v-btn
             color="primary"
             style="right:80px;bottom:130px;"
             fixed dark bottom right
             fab small
             >
             <v-icon>fas fa-question</v-icon>
        </v-btn>
        <v-btn
             color="red"
             style="right:80px;bottom:80px;"
             fixed dark bottom right
             fab small
             >
             <v-icon>fas fa-bug</v-icon>
        </v-btn>
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
    leftMenu: true,
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
      router.push('/home/').catch(()=>{});
    },
    showProteins: function(){
      router.push('/protein/').catch(()=>{});
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
