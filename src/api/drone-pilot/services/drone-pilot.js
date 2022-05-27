'use strict';

/**
 * drone-pilot service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::drone-pilot.drone-pilot');
