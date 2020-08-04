<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="10">
          <v-card flat dense>
            <v-card-title>Dashboard</v-card-title>
            <v-card-subtitle>ProteomicsDB is an effort......</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-row dense>
            <v-col cols="12">
              <v-card>
                <v-card-title>Overview</v-card-title>
                <v-simple-table dense>
                  <tbody>
                    <tr v-for="item in statistics" :key="item.name">
                      <td>{{ item.displayName }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-list two-line>
                  <v-card-title>News</v-card-title>
                  <template v-for="item in news">
                    <v-divider :key="item.title"></v-divider>
                    <v-list-item :key="item.id" @click="openNews">
                      <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-btn x-small fab icon><v-icon>fas fa-ellipsis-h</v-icon></v-btn>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    statistics: [
    {id: 0, displayName: 'Coverage', value: '98', icon: 'fas fa-user', taxcode: 9606},
    {id: 1, displayName: 'Proteins', value: '16785', icon: 'fas fa-user', taxcode: 9606},
    {id: 2, displayName: 'Isoforms', value: '13000', icon: 'fas fa-user', taxcode: 9606},
    ],
    news: [
    {title: "News #1", description: "Short Desc1", id:0},
    {title: "News #2", description: "Short Desc2", id:1},
    {title: "News #3", description: "Short Desc3", id:2},
    ]
  }),
  methods: {
    openNews: function() {
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
.container .prdb-container {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
