import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { api } from './AxiosService'
import { logger } from '../utils/Logger'

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
    this.getBugById(AppState.activeBug.id)
  }

  async closeBug(id) {
    await api.put(`api/bugs/${id}`, { closed: true })
    this.getBugs()
  }
}
export const bugsService = new BugsService()
