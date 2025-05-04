import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullName:{
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "You must have a password"],
        minlength: 6
    },
    socketId: {
        type: String
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAuthToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)