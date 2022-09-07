class DeviceTokenValidate {
  getSchemaForCreate() {
    return {
      body: {
        type: 'object',
        required: ['deviceToken'],
        properties: {
          deviceToken: { type: 'string' },
        }
      }
    }
  }
}

exports.DeviceTokenValidate = new DeviceTokenValidate();