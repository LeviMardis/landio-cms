module.exports = {
    async afterUpdate(event) {
        const id = event.params.where.id
        const currentListing = await strapi.entityService.findOne(event.model.uid, id, {
            populate: {
                image_galleries: {
                    populate: {
                        points_of_interest: {
                            populate: '*'
                        },
                        towns_and_cities: {
                            populate: '*'
                        },
                        property_images: {
                            populate: '*'
                        },
                        maps: {
                            populate: '*'
                        },
                        route_to_property: {
                            populate: '*'
                        },
                        neighboring_area: {
                            populate: '*'
                        }
                    }
                }
            }
        })
        let doNameUpdate = false
        let pointsOfInterest, townsAndCities
        if (currentListing.image_galleries !== null) {
            pointsOfInterest = currentListing.image_galleries.points_of_interest
            pointsOfInterest.forEach(element => {
                if (element.point_of_interest !== null && element.name !== element.point_of_interest.name) {
                    doNameUpdate = true
                    element.name = element.point_of_interest.name
                }
            });
            townsAndCities = currentListing.image_galleries.towns_and_cities
            townsAndCities.forEach(element => {
                if (element.town_and_city !== null && element.name !== element.town_and_city.name) {
                    doNameUpdate = true
                    element.name = element.town_and_city.name
                }
            })
        }
        if (doNameUpdate) {
            await strapi.entityService.update(event.model.uid, id, {
                data: {
                    image_galleries: {
                        property_images: currentListing.image_galleries.property_images,
                        maps: currentListing.image_galleries.maps,
                        route_to_property: currentListing.image_galleries.route_to_property,
                        neighboring_area: currentListing.image_galleries.neighboring_area,
                        points_of_interest: pointsOfInterest,
                        towns_and_cities: townsAndCities
                    }
                }
            })
        }
    },
    async afterCreate(event) {
        console.log(event)
        const id = event.result.id
        const currentListing = await strapi.entityService.findOne(event.model.uid, id, {
            populate: {
                image_galleries: {
                    populate: {
                        points_of_interest: {
                            populate: '*'
                        },
                        towns_and_cities: {
                            populate: '*'
                        }
                    }
                }
            }
        })
        let doNameUpdate = false
        const pointsOfInterest = currentListing.image_galleries.points_of_interest
        const townsAndCities = currentListing.image_galleries.towns_and_cities
        pointsOfInterest.forEach(element => {
            if (element.name !== element.point_of_interest.name) {
                doNameUpdate = true
                element.name = element.point_of_interest.name
            }
        });
        townsAndCities.forEach(element => {
            if (element.name !== element.town_and_city.name) {
                doNameUpdate = true
                element.name = element.town_and_city.name
            }
        })
        if (doNameUpdate) {
            await strapi.entityService.update(event.model.uid, id, {
                data: {
                    image_galleries: {
                        points_of_interest: pointsOfInterest,
                        towns_and_cities: townsAndCities
                    }
                }
            })
        }
    }
}