const hotelbedsService = require("../services/hotelBedsActivity.service");
const {getActivity,getActivityDetail} = require("../helpers/tourActivities.helper");

const moduleName = "Tours & Activities";

class TourActivitiesController {

    constructor() {
        // this.getDestinations = validateRequest(verifyDestinationRequest, this.getDestinations);
        // this.searchActivities = validateRequest(verifySearchRequest, this.searchActivities);
        // this.activityDetails = validateRequest(verifyDetailsRequest, this.activityDetails);
    }

    async getCountries(_, res) {
        try {
            const [hbCountries, mmCountries] = await Promise.all([
                await hotelbedsService.getCountries(),
                // await musementService.getCountries()
                []
            ]);
            const mergedCountries = hbCountries.map((c1) => {
                let v = mmCountries.find(c2 => c2.iso_code === c1.code);
                return {
                    hotel_bed_code: c1.code,
                    musement_id: v ? v.id : 0,
                    name: c1.name
                };
            }).concat(mmCountries.filter(c1 => {
                return !hbCountries.some(c2 => c1.iso_code === c2.code);
            }).map(c1 => {
                return {
                    hotel_bed_code: "",
                    musement_id: c1.id,
                    name: c1.name
                };
            }));
            return res.success({ data: mergedCountries })
        } catch (error) {
            return res.exception({ moduleName: moduleName + '-getCountries', error })
        }
    }


    async searchActivities(req, res) {
        try {
            const response = await getActivity(req.body);            
            return res.success({ data: response});
        } catch (error) {
            return res.exception({ moduleName: moduleName + '-searchActivities', error })
        }
    }

    async activitieDetails(req, res) {
        try {
            const response = await getActivityDetail(req.body);            
            return res.success({ data: response});
        } catch (error) {
            return res.exception({ moduleName: moduleName + '-searchActivities', error })
        }
    }


}

module.exports = new TourActivitiesController();