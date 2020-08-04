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
          <v-list-item @click="showSummary">
            <v-list-item-action>
              <v-icon>far fa-file-alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Summary</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showSummary">
            <v-list-item-action>
              <v-icon>far fa-chart-bar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Peptides MS/MS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showSummary">
            <v-list-item-action>
              <v-icon>fas fa-chart-area</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>FDR estimation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="showSummary">
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
    </v-row>
    <router-view/>
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
  }),
  methods: {
    showSummary: function(pid){
      router.push('/protein/summary/'+pid).catch(()=>{});
    }
  },
  computed: {
  },
  watch: {
    selectedTab: function() {
      router.push('/protein/summary/277563').catch(()=>{});
    }
  },
  mounted() {
    this.show
  }
}
</script>
<style lang="scss">
</style>
