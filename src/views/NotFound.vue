<template>
  <v-main>
      <div id="questionmark">?</div>
      <h1>Error 404 - Not Found</h1>
      <p>
        The page you're trying to access does not exist. <br />
        It might be misspelled or currently unavailable. <br />
        <strong>Please check the URL or try again later. <br /> </strong>
      </p>
  </v-main>
</template>

<script>
// import axios from "axios";

export default {
  name: "NotFound.vue",
};
</script>

<style scoped lang="scss">
h1,
p,
div {
  text-align: center;
}
#questionmark {
  font-size: 200px;
  color: rgba(0,0,0,0.5)
}
</style>