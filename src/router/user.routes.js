export default [
  {
    path: "user",
    component: () => import("pages/manage/user/List.vue"),
    meta: {
      name: "List User",
      requiresAuth: true,
      permission: "read_users"
    }
  },
  {
    path: "user/create",
    component: () => import("pages/manage/user/Create.vue"),
    meta: {
      name: "Create User",
      requiresAuth: true,
      permission: "create_users"
    }
  },
  // Use this sample if
  {
    path: "user/edit/:id",
    component: () => import("pages/manage/user/Edit.vue"),
    meta: {
      name: "Edit User",
      requiresAuth: true,
      permission: "update_users"
    }
  }
];
