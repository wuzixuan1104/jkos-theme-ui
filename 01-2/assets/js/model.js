export const UserModel = {
  findByAccount(username) {
    return new Promise((resolver) => {
      return username === 'shari' ? resolver({ name: 'shari', job: 'developer' }) : resolver(null)
    })
  }
}
