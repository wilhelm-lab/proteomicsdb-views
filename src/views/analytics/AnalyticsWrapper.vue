<template>
  <v-main>
    <v-container fluid>
      <!--
      <v-row no-gutters>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-col>
      </v-row>
      -->
      <router-view></router-view>
      <v-row justify="center" align="center">
        <v-col class="shrink">
          <v-btn
              color="primary"
              style="right:80px;bottom:130px;"
              fixed dark bottom right
              fab x-small
          >
            <v-icon>fas fa-question</v-icon>
          </v-btn>
          <v-btn
              color="red"
              style="right:80px;bottom:80px;"
              fixed dark bottom right
              fab x-small
          >
            <v-icon>fas fa-bug</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
//import router from '@/router';
export default {
}
</script>
<style lang="scss">
</style>
