<template>
  <div class="filters">
    <div
      v-for="filter in Object.keys(filters)"
      :key="filters[filter].label"
      class="filter"
    >
      {{ filters[filter].label }}
      <input
        v-model="filters[filter].value"
        :placeholder="filters[filter].placeholder"
        type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookFilter',
  data () {
    return {
      filters: {
        title: {
          label: 'Title',
          placeholder: 'Enter title',
          value: ''
        },
        publishDate: {
          label: 'Publish date',
          placeholder: 'Enter publish date',
          value: ''
        }
      }
    }
  },
  watch: {
    filters: {
      handler (newVal) {
        this.$emit('change', newVal)
      },
      deep: true
    }
  }
}
</script>
