const publicRoutes = {
  'POST /authenticate': 'UserController.authenticate',
  'POST /register': 'UserController.createUser',
  'POST /createRole': 'RoleController.createRole',
  'GET /project': 'UserProjectController.findById',
//private
  'POST /createProject': 'ProjectController.createProject',
  'GET /roles': 'RoleController.getAll',
  'POST /createProject': 'ProjectController.createProject',
  'POST /assignUser': 'UserProjectController.assignUserToProject',
  'GET /userproject': 'UserProjectController.getAll',
  'GET /users': 'UserController.getAll',
  'GET /projects': 'ProjectController.getAll',
  'GET /projectusers': 'UserProjectController.findByProject',

  'GET /storys': 'StoryController.getAll',
  'POST /storys': 'StoryController.createStory',
};

module.exports = publicRoutes;
