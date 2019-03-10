const publicRoutes = {
  'POST /authenticate': 'UserController.authenticate',
  'POST /register': 'UserController.createUser',
  'POST /registerRole': 'RoleController.createRole',
};

module.exports = publicRoutes;
