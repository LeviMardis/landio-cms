'use strict';

/**
 * point-of-interest service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::point-of-interest.point-of-interest');
