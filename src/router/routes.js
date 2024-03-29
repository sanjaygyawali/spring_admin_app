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
        meta: { name: "main" },
      },
      {
        path: "/login",
        component: () => import("pages/Login.vue"),
        meta: { name: "Login" },
      },
    ],
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
          permission: "menu_read_dashboard",
        },
      },
      {
        path: "/test",
        component: () => import("pages/form/Index.vue"),
        meta: {
          name: "Dashboard",
          // requiresAuth: false,
          // permission: "menu_read_dashboard"
        },
      },
    ],
  },
  {
    path: "/r/forms",
    component: () => import("layouts/BackendLayout.vue"),
    children: [
      {
        path: "form",
        component: () => import("pages/CustomFormResourceCreator.vue"),
        meta: {
          name: "Form Creator",
          requiresAuth: false,
          permission: "menu_read_dashboard",
        },
      },
      {
        path: "edit/:id",
        component: () => import("pages/CustomFormResourceCreator.vue"),
        meta: {
          name: "Form Data Editor",
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/r/:resource",
    component: () => import("layouts/BackendLayout.vue"),
    children: [
      {
        path: "list",
        component: () => import("pages/manage/config/ListPage.vue"),
        meta: {
          name: "List Render",
          requiresAuth: false,
        },
      },
      {
        path: "form",
        component: () => import("pages/manage/config/FormPage.vue"),
        meta: {
          name: "Form Creator",
          requiresAuth: false,
          permission: "menu_read_dashboard",
        },
      },
      {
        path: "edit/:id",
        component: () => import("pages/manage/config/FormPage.vue"),
        meta: {
          name: "Form Data Editor",
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/usertask",
    component: () => import("layouts/BackendLayout.vue"),
    children: [
      {
        path: "form",
        component: () => import("pages/usertask/form.vue"),
      },
    ],
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
        meta: { name: "Dashboard", requiresAuth: true },
      },
      {
        path: "forms/sample-form",
        component: () => import("pages/manage/forms/SampleForm.vue"),
        meta: { name: "Sample Form", requiresAuth: true },
      },
      {
        path: "lists/sample-list",
        component: () => import("pages/manage/lists/SampleList.vue"),
        meta: { name: "Sample List", requiresAuth: true },
      },

      {
        path: "unauthorized",
        component: () => import("pages/Unauthorized.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
