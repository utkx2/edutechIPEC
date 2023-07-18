const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema({
        userId: {
            type: String,
            required: true,
            index: { unique: true }
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: { unique: true },
        },
        password: {
            type: String,
            required: true
        },
        userRole: {
            type: String,
            enum: ["admin", "student"],
            default: "user"
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        ResetPasswordToken: String,
        ResetPasswordEcpire: String
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.createdAt;
                delete ret.updatedAt;
            },
        },
    }, { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;