<template class="row">
  <div class=" row-height Note border shadow my-3">
    <img class="h-100" :src="notes.creator.picture" alt="">  {{ notes.body }}     ||     {{ notes.creator.email }}  ||
    <button class="btn btn-danger" @click="deleteNote">
      Delete Note
    </button>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
// import { notesService } from '../services/NotesService'
export default {
  name: 'Note',
  props: {
    notes: { type: Object, required: true }
  },
  setup(props) {
    return {
      deleteNote() {
        if (window.confirm('Are You Sure')) {
          notesService.deleteNote(props.notes.id, AppState.activeBug.id)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.row-height{
height: 7vh;
}

</style>
