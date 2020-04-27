import {  Language, Type } from './enum';



export interface BaseEntity{
    _id:string
}


export interface QuestionText {
    text:string , 
     language :  Language
}

export interface  Question extends BaseEntity{
    textArr:  QuestionText[] ,
    creatorID:string,
    isDefault: Boolean,
    timestemp: Number,
    questionType: Type,
    min:Number,
    max:Number
}

export interface Medication extends BaseEntity{
    medication : string
}
export interface Treatment extends BaseEntity{
    treatments:string
}

export interface  BaseDoctorDetails {
    username : string;
    password:string;
    user : string;
}


export interface Patient extends BaseEntity{
    firstName: string,
    lastName:   string ,
    creatorID: string,
    phoneNumber : string,
    language : Language,
    startHour : Number,
    endHour : Number,
    questions : Question[],
    treatments : Treatment[],
    medications : Medication[]

}

export interface Doctor extends BaseEntity{
    username : string ,
    password : string,
    firstName : string,
    lastName:string,
    department : string,
    phoneNumber : string,
    creatorID : string,
    mainLanguage : Language,
    languages : Language[]

}

export interface Admin extends BaseEntity{
    username: string,
    password : string,
    hospitalName:string
    
}

