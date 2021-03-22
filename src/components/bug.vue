<template>
  <span>
    <div class="row Bug row-height my-1 border shadow">
      <router-link class="pt-1" :to="{name: 'BugDetails', params: {id: bugs.id}}">
        <img class="h-50" :src="bugs.creator.picture" alt="">   {{ bugs.title }}    ||    {{ bugs.creator.email }} || {{ bugs.creator.updatedAt.slice(5,7) }}/{{ bugs.creator.updatedAt.slice(8,10) }}/{{ bugs.creator.updatedAt.slice(0,4) }}
      </router-link>
      <h4 class=" text-danger pt-3" v-if="bugs.closed == false">
        open
      </h4>
      <h4 class="  text-success pt-3" v-if="bugs.closed == true">
        closed
      </h4>
    </div>
  </span>
</template>

<script>
// import { bugsService } from '../services/BugsService'
export default {
  name: 'Bug',
  props: {
    bugs: { type: Object, required: true }
  },
  setup() {
    return {
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.row-height{
height: 10vh;
}

</style>
