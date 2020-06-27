import mongoose from 'mongoose';
import { Language, QuestionType, AddPopupType } from "./enums";

export const Languages = ["Hebrew" ,"English" , "Arabic" , "French" ,"Russian"];
export const QuestionTypes = ["Binary" , "Regular" , "Quantity"];



export interface IDoctor extends mongoose.Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    phoneNumber: string;
    creatorID: string;
    mainLanguage: Language,
    languages: Language[]
}

export interface RequestUser {
    username: string,
    password: string,
    _id: mongoose.Types.ObjectId;
}
export interface IModelAdmin extends mongoose.Document {
    username: string
    password: string;
    hospitalName: string;
}

export interface IAdmin {
    username: string
    password: string;
    hospitalName: string;
}


export interface IPatient extends mongoose.Document {
    firstName: string;
    lastName: string;
    creatorID: string;
    phoneNumber: string;
    language: Language;
    startHour: number;
    endHour: number;
    questions: IQuestion[];
    treatments: IMedicalAdditions[];
    medications: IMedicalAdditions[];

}


export interface IQuestion extends mongoose.Document {
    textArr: QuestionText[];
    creatorID: string;
    isDefault: boolean;
    timestemp: number;
    questionType: QuestionType;
    min?: number;
    max?: number;
}

export interface QuestionText {
    text: string;
    language: Language;
}


export interface IMedicalAdditions extends mongoose.Document {
    name: string;
    description: string;
    creatorId?: string;
    patientId?: string;
    additionType: AddPopupType;
}