'use strict';

/**
 * drone-pilot router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::drone-pilot.drone-pilot');
