const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = schema({
    username:{
        type:String,
        required:[true,"username is required"],
        maxLength:[12,"username must not exceed 12 characters"]
    },
    email:{
        unique:true,
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"password should have minimum 8 characters"]
    },
    passwordConfirm:{
        type:String,
        required:[true,"password confirmation required"],
        validate:{
            validator: function(val){
                return val === this.password
            },
            message:"passwords donot match"
    }
    },
    role : {
        type:String,
        enum:["admin","commissioner","user"],
        default:"user"
    },
    passwordChangedAt:Date
});
userSchema.pre('save',async function(next){
    // check if password is modified
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});
userSchema.methods.checkPassword = async function(candidatePass,userPass) {
    return await bcrypt.compare(candidatePass,userPass);
}
userSchema.methods.changedPasswordAfter = function(JWT_iat){
    if(this.passwordChangedAt){
        const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000 );
        return JWT_iat < changedAt;
    }
    return false;
}
module.exports = mongoose.model("user",userSchema);