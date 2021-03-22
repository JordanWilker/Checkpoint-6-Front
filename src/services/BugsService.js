import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'
import router from '../router'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {
      logger.error(error)
    }
  }

  async getBugById(id) {
    AppState.activeBug = new Bug()
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = new Bug(res.data)
  }

  async createBugs(bugData) {
    const res = await api.post('api/bugs', new Bug(bugData))
    AppState.activeBug = new Bug(res.body)
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async closeBug(id) {
    await api.delete(`api/bugs/${id}`)
    this.getBugById(id)
  }

  async editBug(id, body) {
    await api.put(`api/bugs/${id}`, body)
    this.getBugById(id)
  }
}
export const bugsService = new BugsService()
