const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /users': 'UserController.createUser',
  'GET /roles': 'RoleController.getAll',
};

module.exports = privateRoutes;