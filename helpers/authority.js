function userRole(role) {
  let menuDashboard = [];
  switch (role) {
    case "admin":
      menuDashboard = ['dashboard', 'user', 'equipment', 'loan']
      return menuDashboard
      break;
    case "user":
      menuDashboard = ['dashboard','user']
      return menuDashboard
      break;
    default:
    return 'dashboard'
  }
}

module.exports = userRole
