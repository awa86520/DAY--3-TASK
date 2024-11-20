  const mongoose = require('mongoose');
 
 const EnrollementSchema = new mongoose.schema({
    name: { type:string , required:true},
    email:{ type : string , required:true},
    phone :{ type : string , required : true},
      selectedServices :{ type : string , required : true},
      EnrollementDate :{ type :Date , default : Date.now},


 });
 module.exports = mongoose.model('Enrollment' , EnrollementSchema);
 