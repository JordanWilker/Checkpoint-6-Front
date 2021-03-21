export class Bug {
  constructor(data = {}) {
    this.closed = data.closed || false
    this.description = data.description || ''
    this.title = data.title || ''
    this.closedDate = data.closedDate || ''
    this.creatorId = data.creatorId || ''
    this.id = data.id || data._id || ''
  }
}
