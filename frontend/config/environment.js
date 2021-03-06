"use strict";

const { name } = require("../package");

module.exports = function (environment) {
  const ENV = {
    environment,
    modulePrefix: name,
    podModulePrefix: `${name}/ui`,

    rootURL: "/",
    locationType: "auto",

    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    moment: {
      includeLocales: ["de"],
    },

    "@sentry/ember": {
      disablePerformance: true,
      sentry: { environment },
    },

    APP: {
      loginRoute: "account.login",

      // Define alertTime in hours.
      // When total time comes close to alertTime, text color changes.
      alertTime: 5,
    },
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;

    // If performance is enabled, the tests fail with:
    // Failed to execute 'measure' on 'Performance'
    // -> Performance is currently disabled by default as we need to adjust
    //    the response headers from Timed to use this feature. As we will
    //    probably do that I keep this setting here.
    ENV["@sentry/ember"].disablePerformance = true;
  }

  if (environment === "production") {
    // No need to configure the DNS as Sentry already reads from SENTRY_DNS.
    // https://docs.sentry.io/platforms/javascript/guides/ember/configuration/options/#dsn
  }

  return ENV;
};
