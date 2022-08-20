import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        firstname: { type: String, required: true, },
        lastname: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        password: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }

)


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const UserModel = mongoose.model("Users", userSchema)

export default UserModel

