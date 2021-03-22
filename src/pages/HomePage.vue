<template>
  <div class=" container-fluid flex-grow-1 flex-column">
    <button type="button" class="btn btn-primary mt-3" data-toggle="modal" data-target="#createModal">
      Create Bug
    </button>
    <br>
    <h4 class="mt-4">
      Bug List
    </h4>
    <button class="btn btn-success mt-3" @click="toggleClose">
      Show Closed
    </button>
    <button class="btn btn-info mt-3" @click="toggleOpen">
      Show Open
    </button>
    <button class="btn btn-dark mt-3" @click="toggleAll">
      Show All
    </button>
    <BugCreate />
    <div v-if="state.toggleClosed== false">
      <ul>
        <Bug class="my-3" v-for="bugs in state.bugsClosed" :key="bugs.id" :bugs="bugs" />
      </ul>
    </div>
    <div v-else-if="state.toggleOpen ==false">
      <ul>
        <Bug class="my-3" v-for="bugs in state.bugsOpen" :key="bugs.id" :bugs="bugs" />
      </ul>
    </div>
    <div v-else>
      <ul>
        <Bug class="my-3" v-for="bugs in state.bugs" :key="bugs.id" :bugs="bugs" />
      </ul>
    </div>
  </div>
</template>

<script>
import bug from '../components/bug'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      bugsClosed: computed(() => AppState.bugs.filter(bug => bug.closed === true)),
      bugsOpen: computed(() => AppState.bugs.filter(bug => bug.closed === false)),
      toggleClosed: true,
      toggleOpen: true
    })
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      state,
      toggleClose() {
        state.toggleClosed = false
        state.toggleOpen = true
        logger.log(state.toggleClosed)
      },
      toggleOpen() {
        state.toggleOpen = false
        state.toggleClosed = true
      },
      toggleAll() {
        state.toggleOpen = true
        state.toggleClosed = true
      }
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
