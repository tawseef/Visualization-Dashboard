const { Data } = require("../model/model");

const getAllData = async () => {
  try{
    const result = await Data.find();
    console.log("Service.......")
    console.log(result)
    return result;
  }catch(e){
    return "Data not found";
  }
};

const postAllData = async (data) =>{
  try{
    const result = await Data.create(data);
    return result;
  }catch(e){
    return "Data not posted";
  }
};


module.exports = {
  getAllData, postAllData
};