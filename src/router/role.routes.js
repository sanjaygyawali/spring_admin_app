export default [
  {
    path: "role",
    component: () => import("pages/manage/role/List.vue"),
    meta: {
      name: "List Role",
      requiresAuth: true,
      permission: "read_roles"
    }
  },
  {
    path: "role/create",
    component: () => import("pages/manage/role/Create.vue"),
    meta: {
      name: "Create Role",
      requiresAuth: true,
      permission: "create_roles"
    }
  },
  // Use this sample if
  {
    path: "role/edit/:id",
    component: () => import("pages/manage/role/Edit.vue"),
    meta: {
      name: "Edit Role",
      requiresAuth: true,
      permission: "update_roles"
    }
  },
  {
    path: "role-permission",
    component: () => import("pages/manage/role/Permission.vue"),
    meta: {
      name: "Manage Permsssions",
      requiresAuth: true,
      permission: "read_role_permission"
    }
  }
];
