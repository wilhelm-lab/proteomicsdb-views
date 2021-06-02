<template>
  <v-row class="ml-10 mt-2">
    <v-col>
      <!-- header -->
      <v-row dense no-gutter>
        <v-col>
          <h1>ProteomicsDB Analytics Toolbox</h1>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <h3>Toolbox</h3>
          <v-layout row ma-2>
            <div v-for="tool in tools" :key="tool.name">
              <v-hover>
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 8 : 2}`"
                        max-width="500"
                        max-height="500">
                  <v-card-title>{{ tool.title }}</v-card-title>
                  <v-img :src="tool.icon" max-height="100%"></v-img>
                  <v-card-actions class="flex-row-reverse">
                    <v-btn
                        :color="$store.state.selectedOrganismShown.secondaryColor"
                        text
                        @click="openTool(tool)"
                    >
                      Open
                      <v-icon right>mdi-arrow-top-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "AnalyticsHome",
  props: {},
  data: () => ({
    tools: [
      {
        title: "Selectivity",
        name: "selectivity",
        icon: require('@/assets/selectivity.png'),
      }
    ]
  }),
  methods: {
    openTool({name}) {
      let routeData = this.$router.resolve('/vue/analytics/' + name);
      window.open(routeData.href, '_blank');
    }
  }
}

</script>

<style scoped>

</style>
