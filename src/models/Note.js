export class Note {
  constructor(data = {}) {
    this.body = data.body || ''
    this.creatorId = data.creatorId || ''
    this.id = data.id || data._id || ''
    this.bug = data.bug || ''
    this.creator = data.creator || ''
  }
}
