<template>
  <v-main>
    <v-container fluid>
      <v-row no-gutters class="mt-2">
        <v-text-field label="Name" class="mx-2 my-0 py-0" type="text" v-model="edName" :readonly="admin != true"></v-text-field>
        <v-text-field label="Description" class="mx-2 my-0 py-0" type="text" v-model="edDescription" :readonly="admin != true"></v-text-field>
      </v-row>
      <v-row>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                Control
              </th>
              <th class="text-left">
                <v-select>
                  :items="edTypes"
                  v-model="selectedEdType"
                  ></v-select>
              </th>
            </tr>
          </thead>
        </v-simple-table>
      </v-row>
      <v-row class="mt-2">
        <v-row>
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
        </v-row>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';
import Utils from '@/control/Utils.js';
export default {
  props: {
  },
  components: {
  },
  data: () => ({
    edName: 'testName',
    edDescription: 'testDescription',
    admin: true,
    edTypes: [
    
    ]
  }),
  methods: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    axios.get('https://www.proteomicsdb.org/proteomicsdb/logic/experimentalDesign/getTreatmentTypes.xsjs').then((response) => {
      console.log(Utils.createTreatmentTypeDictionary(JSON.parse(response.data)));
    })
  },
  created() {
  }
}
</script>
<style lang="scss">
</style>
