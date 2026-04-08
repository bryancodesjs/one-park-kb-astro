<template>
  <div class="mt-14 pt-8 border-t border-[#E2EDFE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <p class="text-[14px] font-semibold text-[#374151] m-0">Was this helpful?</p>
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-full border border-[#E2EDFE] text-[#374151] hover:border-[#014189] hover:text-[#014189] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#014189]"
        :class="feedback === 'yes' ? 'bg-[#E2EDFE] border-[#014189] text-[#014189]' : ''"
        @click="setFeedback('yes')"
        :aria-pressed="feedback === 'yes'"
      >
        <i class="ri-thumb-up-line" aria-hidden="true"></i>
        Yes, helpful
      </button>
      <button
        type="button"
        class="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-full border border-[#E2EDFE] text-[#374151] hover:border-[#6B7280] hover:text-[#6B7280] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6B7280]"
        :class="feedback === 'no' ? 'bg-gray-100 border-gray-400 text-gray-500' : ''"
        @click="setFeedback('no')"
        :aria-pressed="feedback === 'no'"
      >
        <i class="ri-thumb-down-line" aria-hidden="true"></i>
        Not really
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const feedback = ref<'yes' | 'no' | null>(null)

function setFeedback(val: 'yes' | 'no') {
  feedback.value = val
}
</script>
