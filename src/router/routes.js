import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import permissionRoutes from "./permission.routes";

const routes = [
  {
    layout: "",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
        meta: { name: "main" }
      },
      {
        path: "/login",
        component: () => import("pages/Login.vue"),
        meta: { name: "Login" }
      }
    ]
  },
  {
    path: "",
    component: () => import("layouts/BackendLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/dashboard/Index.vue"),
        meta: {
          name: "Dashboard",
          requiresAuth: false,
          permission: "menu_read_dashboard"
        }
      }
    ]
  },
  {
    path: "/manage",
    component: () => import("layouts/BackendLayout.vue"),
    children: [
      ...userRoutes,
      ...roleRoutes,
      ...permissionRoutes,
      {
        path: "",
        component: () => import("pages/manage/Index.vue"),
        meta: { name: "Dashboard", requiresAuth: true }
      },
      {
        path: "forms/sample-form",
        component: () => import("pages/manage/forms/SampleForm.vue"),
        meta: { name: "Sample Form", requiresAuth: true }
      },
      {
        path: "lists/sample-list",
        component: () => import("pages/manage/lists/SampleList.vue"),
        meta: { name: "Sample List", requiresAuth: true }
      },

      {
        path: "unauthorized",
        component: () => import("pages/Unauthorized.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
