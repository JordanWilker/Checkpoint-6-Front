<template>
  <div class="BugCreate">
    <div class="modal fade"
         id="createModalEditBug"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create Bug
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-inline" @submit.prevent="editBugs">
              <div class="form-group">
                <input type="text"
                       name="title"
                       id="title"
                       class="form-control"
                       placeholder="Enter bug Title"
                       aria-describedby="helpId"
                       v-model="state.activeBug.title"
                >
                <textarea type="text"
                          name="body"
                          id="body"
                          class="form-control"
                          placeholder="Enter Body of Bug"
                          aria-describedby="helpId"
                          v-model="state.activeBug.description"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button class="btn btn-success" @click="editBugs">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import $ from 'jquery'
export default {
  name: 'BugEdit',
  setup() {
    const state = reactive({
      activeBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async editBugs() {
        try {
          state.activeBug.closed = false
          await bugsService.editBug(state.activeBug.id, state.activeBug)
          logger.log('is it going')
          $('#createModalEditBug').modal('hide')
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
