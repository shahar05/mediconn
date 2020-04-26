import {  Language } from './enum';


export interface BaseEntity{
    id:string
}

export interface  BaseDoctorDetails {
    username : string;
    password:string;
}

export interface Doctor extends BaseEntity{
    username : string ,
    password : string,
    firstName : string,
    lastName:string,
    department : string,
    phoneNumber : string,
    creatorID : String,
    mainLanguage : Language,
    languages : Language[]

}

export interface Admin extends BaseEntity{
    username: String,
    password : String,
    hospitalName:String
    
}

