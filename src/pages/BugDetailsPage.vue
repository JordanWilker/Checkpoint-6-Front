<template>
  <div class="BugDetails">
    {{ state.activeBug.title }}
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      bugsService.getBugById(route.params.id)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
