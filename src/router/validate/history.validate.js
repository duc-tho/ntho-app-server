class HistoryValidate {
  getSchemaForRead() {
    return {
      querystring: {
        properties: {
          p: { type: 'number' },
          l: { type: 'number' }
        }
      }
    }
  }

  getSchemaForCreate() {
    return {
      body: {
        type: 'object',
        required: ['url', 'wm', 'nwm'],
        properties: {
          url: { type: 'string' },
          wm: { type: 'string' },
          nwm: { type: 'string' },
          title: { type: 'string' }
        }
      }
    }
  }
}

exports.HistoryValidate = new HistoryValidate();