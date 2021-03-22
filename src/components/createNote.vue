<template>
  <div class="NoteCreate">
    <div class="modal fade"
         id="createModalNote"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Note
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createNote">
              <div class="form-group">
                <input type="text"
                       name="title"
                       id="title"
                       class="form-control"
                       placeholder="Enter note Title"
                       aria-describedby="helpId"
                       v-model="state.newNote.body"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button class="btn btn-success" @click="createNotes">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'NoteCreate',
  setup() {
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNotes() {
        try {
          state.newNote.bug = AppState.activeBug.id
          await notesService.createNotes(state.newNote)
          state.newNote = {}
          $('#createModal').modal('hide')
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
