const mongoose = require('mongoose');
const schema = mongoose.Schema;

const houseSchema = new schema({
   // location,monthlyPayment,description,commissioner,rooms ,isNearRoad,hasParking,initialPayment,frontImage,otherImages,hasWater,electricity
   monthlyPayment:{
       type:Number,
       required:[true,"garagaza igiciro cy'ubukode"]
   },
   initialPayment:{
       type:Number,
       required:[true,"ni angahe umuntu atanga bwa mbere"]
   },
   description:{
       type:String,
       required:[true,"sobanura neza ibiyiranga , utange nandi makuru "]
   },
   rooms:{
       type:Number,
       required:[true,"garagaza ibyumba ifite"]
   },
   hasParking:{
       type:Boolean,
       required:[true,"ese ifite parking"]
   },
   isNearRoad:{
       type:Boolean
   },
   isAlone:{
       type:Boolean,
       required:[true,"ese iri yonyine cyangwa iri mugipangu nizindi"]
   },
   frontImage:{
       type:String
    //    required:[true,"garagaza ifoto yayo"]
   },
   otherImages:[String],
   electricityStatus:{
       type:String,
       enum:{
           values:['ifite cash power yayo','isangira umuriro nizindi'],
           message:"garagaza niba 'ifite cash power yayo' cyangwa 'isangira umuriro nizindi' gusa"
        },
    required:[true,'ese ifite cash power yayo cyangwa isangira umuriro nizindi ?']
   }
});


module.exports = mongoose.model('House',houseSchema);