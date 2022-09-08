class TimeTableValidate {
  getSchemaForCreate() {
    return {
      body: {
        type: 'object',
        required: ['data'],
        properties: {
          data:  { type: 'string' }
        }
      }
    }
  }
}

exports.TimeTableValidate = new TimeTableValidate();