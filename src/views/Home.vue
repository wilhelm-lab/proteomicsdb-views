<template>
  <v-main>
    <v-container fluid xl12>
      <v-row dense>
        <v-col cols="2">
          <v-card outlined>
            <v-list dense>
              <v-list-item>
                <div class="overline mb-4">Overview</div>
              </v-list-item>
            </v-list>
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
        <v-col cols="8">
          <v-card flat offset-y>
            <v-card-title>ProteomicsDB is an effort......</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card outlined>
              <v-list-item>
                <div class="overline mb-4">News</div>
              </v-list-item>
              <v-col cols="12"
              v-for="item in news"
              :key="item.id"
              :value="item.id"
               >
            <v-card 
              >
              <v-card-title>{{item.title}}</v-card-title>
              <v-card-subtitle>{{item.description}}</v-card-subtitle>
              <v-card-actions>
                <v-btn text link>Read more!</v-btn>
              </v-card-actions>
            </v-card>
            </v-col>
          </v-card>
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
    {title: "News #1", description: "Short Desc1", id:1},
    {title: "News #2", description: "Short Desc2", id:2},
    {title: "News #3", description: "Short Desc3", id:3},
    ]
  }),
  methods: {
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
