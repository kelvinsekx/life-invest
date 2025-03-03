<script setup lang="ts">
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps({
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

watch(
  () => props.showing,
  (newVal) => {
    if (newVal) {
      // Disable body scroll when modal is open
      disableBodyScroll(document.body)
    } else {
      // Re-enable body scroll when modal is closed
      enableBodyScroll(document.body)
    }
  },
)

onBeforeUnmount(() => {
  clearAllBodyScrollLocks()
})
</script>

<template>
  <div
    v-if="showing"
    @click.prevent="close"
    class="fixed inset-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.75)] z-50"
  >
    <!-- technically, you do not need this button to close the modal -->
    <!-- click anywhere outside the #main__content to close modal -->

    <!-- the attr main__content exist for easy readability for humans -->
    <div
      id="main__content"
      class="bg-white shadow-lg rounded-lg p-8 overflow-y-scroll h-full relative"
      @click.stop
    >
      <button
        aria-label="close"
        class="absolute top-0 right-0 text-xl text-black"
        @click.prevent="close"
      >
        &times; CLOSE
      </button>
      <slot></slot>
    </div>
  </div>
</template>
