const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
    {
        a: {
            type: Number,
        },
        b: {
            type: Number,
        },
        c: {
            type: Number,
        },
        d: {
            type: Number,
        },
        e: {
            type: Number,
        },
        sno:{
            type: Number,
        },
        resultFor: {
            type: String,
        },
        nextDraw: {
            type: String,
        },
        created_At: { type: Date },
    },
    { timestamps: true }
);

const ResultModel = mongoose.model("Results", resultSchema);

const getAllResult = () => ResultModel.find();

const getResultByIdFn = (id) => ResultModel.findById(id);
const generateResult = (data) => new ResultModel(data).save().then((result) => result.toObject());
const getResultBYDateModel = (date, resultFor) => ResultModel.findOne({ created_At: date, resultFor: resultFor });
const getResultBYSpecificBeforeToDay = (date) => ResultModel.find({ created_At: date });
const getResultBYSpecificToDay = (date, resultForArr) => ResultModel.find({created_At:date, resultFor: { $in: resultForArr } });

module.exports = {getAllResult, generateResult, getResultBYDateModel ,getResultBYSpecificBeforeToDay, getResultBYSpecificToDay, getResultByIdFn};
