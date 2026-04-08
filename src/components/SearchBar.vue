<template>
  <div class="relative w-full" ref="containerRef">

    <!-- Input row -->
    <div class="flex items-center gap-3">
      <div class="relative flex-1">
        <label :for="inputId" class="sr-only">Search the knowledge base</label>
        <input
          :id="inputId"
          v-model="query"
          type="search"
          :placeholder="placeholder"
          class="w-full h-[52px] pl-5 pr-4 rounded-full border border-[#E2EDFE] bg-white text-[15px] text-[#0A1628] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#014189] transition-colors"
          autocomplete="off"
          @keydown.enter="onEnter"
          @keydown.escape="closeDropdown"
          @keydown.arrow-down.prevent="focusResult(0)"
          aria-haspopup="listbox"
          :aria-expanded="showDropdown"
          aria-autocomplete="list"
          :aria-controls="dropdownId"
        />
      </div>
      <button
        type="button"
        class="h-[52px] px-6 rounded-full bg-[#014189] text-white text-[14px] font-semibold flex items-center gap-2 hover:bg-[#002A5A] transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#014189]"
        @click="onEnter"
        aria-label="Search"
      >
        Search
        <i class="ri-search-line text-base" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Dropdown results -->
    <Transition name="dropdown">
      <div
        v-if="showDropdown"
        :id="dropdownId"
        role="listbox"
        aria-label="Search suggestions"
        class="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E2EDFE] rounded-2xl shadow-lg overflow-hidden z-40"
      >
        <!-- No results -->
        <div
          v-if="results.length === 0"
          class="px-5 py-4 text-sm text-[#6B7280]"
          role="option"
          aria-selected="false"
        >
          No results for "<span class="font-semibold text-[#0A1628]">{{ query }}</span>"
        </div>

        <!-- Result items -->
        <template v-else>
          <a
            v-for="(article, idx) in results"
            :key="article.slug"
            :href="`/browse/${article.categorySlug}/${article.slug}`"
            role="option"
            :aria-selected="focusedIndex === idx"
            :ref="el => { if (el) resultRefs[idx] = el as HTMLElement }"
            class="flex items-start gap-3 px-5 py-3.5 hover:bg-[#F7FAFD] transition-colors border-b border-[#E2EDFE] last:border-b-0 no-underline group"
            :class="focusedIndex === idx ? 'bg-[#F7FAFD]' : ''"
            @click="closeDropdown"
            @keydown.arrow-down.prevent="focusResult(idx + 1)"
            @keydown.arrow-up.prevent="focusResult(idx - 1)"
            @keydown.escape="closeDropdown"
          >
            <!-- Category icon -->
            <div class="w-8 h-8 rounded-lg bg-[#E2EDFE] flex items-center justify-center shrink-0 mt-0.5">
              <i :class="[getCategoryIcon(article.categorySlug), 'text-[#014189] text-sm']" aria-hidden="true"></i>
            </div>
            <!-- Text -->
            <div class="flex flex-col gap-0.5 min-w-0">
              <span class="text-[14px] font-semibold text-[#0A1628] group-hover:text-[#014189] transition-colors truncate">
                {{ article.title }}
              </span>
              <span class="text-[12px] text-[#6B7280] truncate">
                {{ getCategoryName(article.categorySlug) }}
              </span>
            </div>
            <!-- Arrow -->
            <i class="ri-arrow-right-up-line text-[#014189] text-sm ml-auto shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></i>
          </a>

          <!-- See all results -->
          <button
            type="button"
            class="w-full text-left px-5 py-3 text-[13px] font-semibold text-[#014189] hover:bg-[#F7FAFD] transition-colors flex items-center gap-1.5"
            @click="goToSearch"
          >
            <i class="ri-search-line text-sm" aria-hidden="true"></i>
            See all results for "{{ query }}"
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Article {
  slug: string
  categorySlug: string
  title: string
  summary: string
  tags: string[]
}

interface Category {
  slug: string
  name: string
  icon: string
}

const props = defineProps<{
  articles: Article[]
  categories: Category[]
  placeholder?: string
  inputId?: string
  dropdownId?: string
  searchPageBase?: string
}>()

const placeholder  = props.placeholder    ?? 'What do you want to know today?'
const inputId      = props.inputId        ?? 'kb-search'
const dropdownId   = props.dropdownId     ?? 'kb-search-dropdown'
const searchPageBase = props.searchPageBase ?? '/browse'

const query        = ref('')
const focusedIndex = ref(-1)
const containerRef = ref<HTMLElement | null>(null)
const resultRefs   = ref<HTMLElement[]>([])

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (q.length < 2) return []
  return props.articles
    .filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
    .slice(0, 7)
})

const showDropdown = computed(() => query.value.trim().length >= 2)

function getCategoryIcon(slug: string) {
  return props.categories.find(c => c.slug === slug)?.icon || 'ri-file-text-line'
}

function getCategoryName(slug: string) {
  return props.categories.find(c => c.slug === slug)?.name || ''
}

function focusResult(idx: number) {
  if (results.value.length === 0) return
  focusedIndex.value = Math.max(0, Math.min(idx, results.value.length - 1))
  resultRefs.value[focusedIndex.value]?.focus()
}

function onEnter() {
  if (query.value.trim().length > 0) {
    window.location.href = `${searchPageBase}?q=${encodeURIComponent(query.value.trim())}`
    closeDropdown()
  }
}

function goToSearch() {
  window.location.href = `${searchPageBase}?q=${encodeURIComponent(query.value.trim())}`
  closeDropdown()
}

function closeDropdown() {
  query.value = ''
  focusedIndex.value = -1
}

function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    closeDropdown()
  }
}

onMounted(()    => document.addEventListener('mousedown', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutsideClick))

watch(results, () => {
  focusedIndex.value = -1
  resultRefs.value   = []
})
</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button { display: none; }

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
