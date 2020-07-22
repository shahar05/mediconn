import mongoose from 'mongoose';
import { Language, QuestionType, AddPopupType } from "./enums";

export const Languages = ["Hebrew" ,"English" , "Arabic" , "French" ,"Russian"];
export const QuestionTypes = ["Quantity" ,"Binary" , "Regular" ]; // changed the order



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
    lastSeen? : number;
    endHour: number;
    password: string;
    questions: IQuestion[];
    treatments: IMedicalAdditions[];
    medications: IMedicalAdditions[];

}
export interface AppQuestion {
    _id : string,
    text: string;
    questionType: number;
    min?: number;
    max?: number;
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

export interface IRecord extends mongoose.Document {
   
    patientId : string;
    answerArr : Answer[];
    date : Date;
    timestamp?: number
    year?:number
    mounth?:number
    day?:number
}
export interface Answer {
    questionId : string ;
    answer : number;
}

export interface QuestionResult{
    name : string; // name = question text | when default question --> name = patient.name
    series : Result[];
}

export interface Result{
    name : string ; // name = Date
    value : number;
}

export interface IMedicalAdditions extends mongoose.Document {
    name: string;
    description: string;
    creatorId?: string;
    patientId?: string;
    additionType: AddPopupType;
}


// {
//     "name": "kama peemim pipi?",
//     "series": [
//       {
//         "value": 2202,
//         "name":    this.date.toDateString()
//       },
//       {
//         "value": 3685,
//         "name": "2016-09-23T06:47:56.717Z"
//       },
//       {
//         "value": 3655,
//         "name": "2016-09-23T21:25:49.776Z"
//       },
//       {
//         "value": 4926,
//         "name": "2016-09-17T11:46:00.990Z"
//       },
//       {
//         "value": 3012,
//         "name": "2016-09-18T03:58:42.477Z"
//       }
//     ]
//   }