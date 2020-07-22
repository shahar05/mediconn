import { Schema } from "mongoose";
import { Languages } from "../models";


export const DoctorSchema = new Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    creatorID: { type: String, required: true },
    mainLanguage: { type: String, enum: Languages, required: true },
    languages: {
        type: [{ type: String, enum: Languages, unique: false, required: true }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    }
});

function arrayLimit(languagesArray: string[]) {

    

    let findDuplicates = (arr: any) => arr.filter((item: any, index: any) => arr.indexOf(item) != index);
    if (findDuplicates(languagesArray).length != 0) {
        console.log("====================================================");
        console.log("findDuplicates");
    }
    return languagesArray.length <= 5 && findDuplicates(languagesArray).length == 0;
}

