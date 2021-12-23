# Zanzibar Petroleum (Frontend)

A Quasar Framework app

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

## Extension (Rasello User Management Plugin)

Rasello User Management Plugin is required for this project to run which handles the authetication management of the system. You can find the extension at: [Rasello User Management Quasar Extension](https://bitbucket.org/rasello/user_management_plugin/)

### Installing Rasello User Management Extension

Firstly, go to the root directory of extension and run the following command:

```bash
yarn link
```

Then, go to the root directory of this project and run the following command:

```bash
yarn link quasar-app-extension-rasello-user-management
```

For more information, see rasello user management extension's Readme file.

## env Variables

1. API_URL: The url for the backend API

2. REPORT_TYPE: The type of report for generated reports like consignment report and consignment survey report. Available options are `download | html`.

### Customize the configuration

See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
