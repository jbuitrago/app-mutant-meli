var StatsService = require("../services/stats.services");
/*
* @param  {} req
* @param  {} res
* @param  {} next
*/
exports.getMutants = async function (req, res, next) {

  try {
    
    var stats = await StatsService.getStats();

    return res
      .status(200)
      .json({
        status: 200,
        data: stats,
        message: "ok",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

