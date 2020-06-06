import mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hospitalName: { type: String, required: true }

});
