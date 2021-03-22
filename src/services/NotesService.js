import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class NotesService {
  async getNotesByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNotes(noteData) {
    const res = await api.post('api/notes', new Note(noteData))
    AppState.activeNote = new Note(res.body)
    this.getNotesByBugId(AppState.activeBug.id)
  }

  async deleteNote(id, bugId) {
    await api.delete(`api/notes/${id}`)
    this.getNotesByBugId(bugId)
  }
}
export const notesService = new NotesService()
