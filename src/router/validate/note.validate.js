class NoteValidate {
  getSchemaForCreate() {
    return {
      body: {
        type: 'object',
        required: ['title', 'mood'],
        properties: {
          title: { type: 'string' },
          mood: { type: 'string' },
        }
      }
    }
  }
}

exports.NoteValidate = new NoteValidate();