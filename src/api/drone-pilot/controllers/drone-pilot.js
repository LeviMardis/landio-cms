'use strict';

/**
 *  drone-pilot controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::drone-pilot.drone-pilot');
