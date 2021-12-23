export default [
  {
    path: "permission",
    component: () => import("pages/manage/permission/List.vue"),
    meta: {
      name: "List Permission",
      requiresAuth: true,
      permission: "read_permissions"
    }
  },
  {
    path: "permission/create",
    component: () => import("pages/manage/permission/Create.vue"),
    meta: {
      name: "Create Permission",
      requiresAuth: true,
      permission: "create_permissions"
    }
  },
  // Use this sample if
  {
    path: "permission/edit/:id",
    component: () => import("pages/manage/permission/Edit.vue"),
    meta: {
      name: "Edit Permission",
      requiresAuth: true,
      permission: "update_permissions"
    }
  }
];
