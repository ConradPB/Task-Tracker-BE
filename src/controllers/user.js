class User {
  fetchUsers(req, res) {
    return res.json(Object.values(req.context.models.users));

  }
    
  fetchUser(req, res) {
    return res.send(req.context.models.users[req.params.userId]);
  }

}

export default User