const Service = require("../service/service");
const catchAsync = require("../util/catchAsync");

const getAllData = catchAsync(async (req, res) => {
    const data = await Service.getAllData();
    res.send(data);
})

const postAllData = catchAsync(async (req, res) => {
    const {body} = req;
    await Service.postAllData(body);
    res.sendStatus(200);
})


module.exports = {
  getAllData, postAllData
};