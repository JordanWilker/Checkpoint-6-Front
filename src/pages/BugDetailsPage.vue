<template class="container-fluid flex-grow-1 flex-column">
  <div class="BugDetails row card text-center row-width shadow">
    <div class="col card-body" v-if="state.activeBug.creator">
      <h4 card-title class="card-title">
        {{ state.activeBug.title }}
      </h4>
      <br>
      <div class="card-text">
        {{ state.activeBug.description }}
      </div>
      <br>
      <div class="card-text align-items-end">
        {{ state.activeBug.creator.updatedAt.slice(5,7) }}/{{ state.activeBug.creator.updatedAt.slice(8,10) }}/{{ state.activeBug.creator.updatedAt.slice(0,4) }}
      </div>
    </div>
  </div>
  <div class="row">
  </div>
  <div class="row">
    <div class="col">
      <h3 class=" mx-5  text-danger" v-if="state.activeBug.closed == false">
        Open
      </h3>
      <button class=" mx-5 btn btn-danger" @click="closeBug" v-if="state.activeBug.closed == false">
        close
      </button>
      <h3 class=" mx-5 col text-success" v-if="state.activeBug.closed == true">
        Closed
      </h3>
      <br>
      <button type="button" class="btn btn-primary ml-5 mt-3" data-toggle="modal" data-target="#createModalNote">
        Create Note
      </button>
      <br>
      <button v-if="state.activeBug.closed == false" type="button" class="btn btn-danger ml-5 mt-3" data-toggle="modal" data-target="#createModalEditBug">
        Edit Bug
      </button>
    </div>
  </div>
  <BugEdit />
  <NoteCreate />
  <h3>
    Notes:
  </h3>
  <div class="my-3">
    <Note class="my-2" v-for="notes in state.notes" :key="notes.id" :notes="notes" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      date: computed(() => AppState.activeBug.creator.updatedAt),
      activeBug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    onMounted(() => {
      bugsService.getBugById(route.params.id)
      notesService.getNotesByBugId(route.params.id)
    })
    return {
      state,
      closeBug() {
        if (window.confirm('Are you sure')) {
          bugsService.closeBug(AppState.activeBug.id)
        }
      },
      getTime() {
        logger.log(state.date.toLocaleString('en-US'))
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.row-width{
  width: 40vw;
}

</style>
