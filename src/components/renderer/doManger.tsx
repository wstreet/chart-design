
class DoManger {
  private cursor: number = 0
  private size: number
  private history: any[] = []

  constructor(size?: number) {
    this.size = size != null ? size : 100
    this.clear()
  }




  clear() {
    this.cursor = 0
    this.history = []
  }

  isEmpty() {
    return this.history.length === 0
  }

  canUndo() {
    return this.cursor > 1
  }

  canRedo() {
    return this.cursor < this.history.length
  }

  undo() {
    if (this.cursor > 1) {
      this.cursor -= 1
      const edit = this.history[this.cursor - 1]
      return edit
    }
  }

  redo() {
    const count = this.history.length
    if (this.cursor < count) {
      const edit = this.history[this.cursor]
      this.cursor += 1
      return edit
    }
  }

  add(edit: any) {
    this.trim()

    if (this.size > 0 && this.size === this.history.length) {
      this.history.shift()
    }

    this.history.push(edit)
    this.cursor = this.history.length
  }

  trim() {
    if (this.history.length > this.cursor) {
      this.history.splice(
        this.cursor,
        this.history.length - this.cursor,
      )
    }
  }
}

export const doManger = new DoManger(50)