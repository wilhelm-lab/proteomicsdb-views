<template>
  <v-combobox
    v-model="aSelectedOptions"
    :items="aOptions"
    :item-text="sTextAttribute"
    :item-value="sValueAttribute"
    :label="sLabel"
    v-on:change="onChange"
    @input="sSearchInput=null"
    :search-input.sync="sSearchInput"
    return-masked-value
    multiple
    >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="removeSelected(item)"
      >
        {{ item[sTextAttribute] }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    aOptions: {
      type: Array,
      default: null
    },
    sTextAttribute: {
      type: String,
      default: ''
    },
    sValueAttribute: {
      type: String,
      default: ''
    },
    sLabel: {
      type: String,
      default: 'Input'
    },
    sSelectAllValue: {
      type: String,
      default: '-1'
    }
  },
  data: function () {
    return {
      sSearchInput: null, // this clears the typed in text in autocomplete mode
      aSelectedOptions: null
    }
  },
  methods: {
    removeSelected: function (item) {
      this.aSelectedOptions.splice(this.aSelectedOptions.indexOf(item), 1)
      this.aSelectedOptions = [...this.aSelectedOptions]
      this.onChange()
    },
    onChange: function () {
      if (this.aSelectedOptions.length > 0 && (this.aSelectedOptions.slice(-1)[0][this.sValueAttribute].toString() === this.sSelectAllValue || this.aSelectedOptions[0][this.sValueAttribute].toString() === this.sSelectAllValue)) {
        this.aSelectedOptions = this.aSelectedOptions.slice(-1)
      }
      this.$emit('onChange', this.aSelectedOptions);
    }
  }
}
</script>
