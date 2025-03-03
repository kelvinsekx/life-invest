<script setup lang="ts">
defineProps({
  showing: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['toggle-modal'])

// methods
const close = () => {
  emits('toggle-modal')
}
</script>

<template>
  <div
    v-if="showing"
    @click.prevent="close"
    class="fixed inset-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.75)] z-50"
  >
    <!-- technically, you do not need this button to close the modal -->
    <!-- click anywhere outside the #main__content to close modal -->
    <button aria-label="close" class="absolute top-0 right-0 text-xl text-white my-2 mx-4">
      &times; CLOSE
    </button>
    <!-- the attr main__content exist for easy readability for humans -->
    <div id="main__content" class="bg-white shadow-lg rounded-lg p-8" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
