var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ThirdPartyProviderSchema = new Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
});

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Must have a username"]
    },
    password: {
        type: String,
        required: [true, "Must have a password"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Must provide email"]
    },
    userPermission: {
        type: String,
        enum: ["Admin", "Client", "Guest"],
        default: "Guest"
    },
    emailIsVerified: {
        type: Boolean,
        default: false
    },
    thirdPartyAuth: [ThirdPartyProviderSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("User", UserSchema);
