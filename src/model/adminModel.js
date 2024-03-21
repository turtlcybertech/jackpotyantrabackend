const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true });
const AdminModel = mongoose.model('Admin', adminSchema);
// User Actions
const getAdminsFn = () => AdminModel.find();
const getAdminByUserIdFn = (userid) => AdminModel.findOne({ userid });
const createAdminFn = (data) => new AdminModel(data).save().then((admin) => admin.toObject());
const deleteAdminByUserIdFn = (userid) => AdminModel.findOneAndDelete({ userid });

module.exports = {getAdminsFn, getAdminByUserIdFn, createAdminFn, deleteAdminByUserIdFn};


