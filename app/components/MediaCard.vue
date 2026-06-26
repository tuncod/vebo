<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>

<template>
  {{ id }}
</template>