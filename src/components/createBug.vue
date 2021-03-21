<template>
  <div class="BugCreate">
    <div class="modal fade"
         id="createModal"
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
            <form class="form-inline" @submit.prevent="createBug">
              <div class="form-group">
                <input type="text"
                       name="title"
                       id="title"
                       class="form-control"
                       placeholder="Enter bug Title"
                       aria-describedby="helpId"
                       v-model="state.newBug.title"
                >
                <input type="text"
                       name="body"
                       id="body"
                       class="form-control"
                       placeholder="Enter Body of Bug"
                       aria-describedby="helpId"
                       v-model="state.newBug.description"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button class="btn btn-success" @click="createBugs">
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
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'BugCreate',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBugs() {
        try {
          await bugsService.createBugs(state.newBug)
          state.newBug = {}
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
