<!-- Client-side search/filter within a single category -->
<template>
  <div>
    <!-- Search input -->
    <div class="relative mb-8">
      <label :for="inputId" class="sr-only">Search within category</label>
      <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-base" aria-hidden="true"></i>
      <input
        :id="inputId"
        v-model="localSearch"
        type="search"
        :placeholder="placeholder"
        class="w-full h-[46px] pl-10 pr-4 rounded-full border border-[#dce8f2] bg-white text-[14px] text-[#0A1628] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#012d53] transition-colors"
      />
    </div>

    <!-- Article grid -->
    <div v-if="filtered.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="article in filtered"
        :key="article.slug"
        :href="`/browse/${article.categorySlug}/${article.slug}`"
        class="res-card group flex flex-col gap-3 p-5 rounded-2xl bg-white transition-all duration-200 no-underline border border-[#dce8f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        :style="`--cat-color: ${categoryColor}`"
        :aria-label="article.title"
      >
        <h3 class="res-title text-[15px] font-bold text-[#0A1628] leading-snug line-clamp-2 transition-colors duration-150 m-0">
          {{ article.title }}
        </h3>
      </a>
    </div>

    <div v-else class="text-[15px] text-[#6B7280] py-12 text-center">
      No articles match "<span class="font-semibold text-[#0A1628]">{{ localSearch }}</span>"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Article {
  slug: string
  categorySlug: string
  title: string
  summary: string
  tags: string[]
}

const props = defineProps<{
  articles: Article[]
  categoryColor?: string
  placeholder?: string
  inputId?: string
}>()

const categoryColor = props.categoryColor ?? '#012d53'
const placeholder   = props.placeholder   ?? 'Search articles…'
const inputId       = props.inputId       ?? 'cat-search'

const localSearch = ref('')

const filtered = computed(() => {
  const q = localSearch.value.toLowerCase().trim()
  if (!q) return props.articles
  return props.articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  )
})
</script>

<style scoped>
.res-card:hover {
  border-color: var(--cat-color);
  box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.1);
}
.res-card:focus-visible { outline-color: var(--cat-color); }
.res-card:hover .res-title { color: var(--cat-color); }

input[type="search"]::-webkit-search-cancel-button { display: none; }
</style>
