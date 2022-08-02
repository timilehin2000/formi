const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt();

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function (password) {
    const user = this;

    return bcrypt.compare(password, user.password).catch((e) => false);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
