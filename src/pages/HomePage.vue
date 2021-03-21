<template>
  <div class=" container-fluid flex-grow-1 flex-column">
    <button type="button" class="btn btn-primary mt-3" data-toggle="modal" data-target="#createModal">
      Create Bug
    </button>
    <BugCreate />
    <ul>
      <Bug class="my-3" v-for="bugs in state.bugs" :key="bugs.id" :bugs="bugs" />
    </ul>
  </div>
</template>

<script>
import bug from '../components/bug'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      state
    }
  },
  components: {
    bug
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
