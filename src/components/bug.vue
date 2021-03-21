<template>
  <li class="Bug">
    <router-link :to="{name: 'BugDetails', params: {id: bugs.id}}">
      {{ bugs.title }}
    </router-link>
    <button class=" mx-5 btn btn-danger" @click="closeBug" v-if="bugs.closed == false">
      close
    </button>
    <button class=" mx-5 btn btn-success" v-if="bugs.closed == true">
      closed
    </button>
  </li>
</template>

<script>
import { bugsService } from '../services/BugsService'
export default {
  name: 'Bug',
  props: {
    bugs: { type: Object, required: true }
  },
  setup(props) {
    return {
      closeBug() {
        bugsService.closeBug(props.bugs.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
