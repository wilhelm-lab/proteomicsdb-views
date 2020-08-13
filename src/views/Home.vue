<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <!-- main container -->
        <v-col cols="10">
          <!-- header -->
          <v-row>
            <v-col cols="12">
              <v-card flat dense>
                <v-card-title>Welcome to ProteomicsDB!</v-card-title>
                <v-card-subtitle>ProteomicsDB is an effort of the Technische Universität München (TUM). It is dedicated to expedite the identification of the human proteome and its use across the scientific community.</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <!-- /header -->
          <v-row>
            <v-col cols="7">
              <v-layout class="container-layout" row ma-2>
                <v-flex v-for="(t, index) in tiles" :key="index" xs6 md6>
                  <v-hover>
                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 8 : 2}`" class="ma-2">
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <v-avatar class="ma-3" size="125" tile :key="t.id">
                          <v-img :src="icons[t.icon]" :key="t.icon"></v-img>
                        </v-avatar>
                        <div>
                          <v-card-title class="headline">{{t.title}}</v-card-title>
                          <v-card-subtitle>{{t.description}}</v-card-subtitle>
                        </div>
                      </div>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-col>
            <v-divider vertical inset></v-divider>
            <v-col cols="4">
              <v-layout class="container-layout" row my-2>
                <v-flex xs6 md6>
                  <v-hover>
                  <v-card class="ma-2">
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <v-avatar class="ma-3" size="125" tile>
                        <v-img :src="icons['searchIcon']"></v-img>
                      </v-avatar>
                      <div>
                        <v-card-title class="headline">test</v-card-title>
                        <v-card-subtitle>test</v-card-subtitle>
                      </div>
                    </div>
                  </v-card>
                  </v-hover>
                  </v-flex>
              </v-layout>
            </v-col>
          </v-row>
        </v-col>
        <!-- right side news and stats section -->
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
    ],
    icons: {
      analyticsIcon: require('@/assets/home/protein_adopt_small.jpg'),
      searchIcon: require('@/assets/home/protein_small.jpg'),
      uploadIcon: require('@/assets/home/repository_small.jpg'),
      prositIcon: require('@/assets/home/prosit.png')
    },
    tiles: [
    {title: 'Protein search', description: 'Explore the proteome of your selected organism.', icon: "searchIcon", id:0},
    {title: 'Analytics Toolbox', description: 'Use our analytics tools to explore co-expression patterns, etc.', icon: "analyticsIcon", id:1},
    {title: 'Upload your data', description: 'Use our analytics and visualization tools on your data.', icon: "uploadIcon", id:2},
    {title: 'Prosit', description: 'Predict peptide properties using our online service.', icon: "prositIcon", id:3}
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
.container {
  min-width: 100%;
}

.container.fluid {
  max-width: 90%;
  min-width: 90%;
}

.container-layout {
  width: inherit;
  min-width: inherit;
}

</style>
