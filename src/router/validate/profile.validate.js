class ProfileValidate {
  getSchemaForRead() {
    return {
      body: {
        properties: {
          userId: { type: 'string' },
        }
      }
    }
  }
}

exports.ProfileValidate = new ProfileValidate();