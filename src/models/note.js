const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
    content:String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    task: { type: Schema.Types.ObjectId, ref: 'Task' }
});

const noteModel = mongoose.model("Notes", noteSchema);

module.exports = noteModel;
