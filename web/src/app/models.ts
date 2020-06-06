import { Language, Type, AddPopupType } from './enum';

export interface BaseEntity {
    _id?: string;
}


export interface QuestionText {
    text: string;
    language: Language;
}

export interface BaseQuestion {
    textArr: QuestionText[];
    creatorID: string;
    isDefault: boolean;
    questionType: Type;
    min?: number;
    max?: number;
}

export interface Question extends BaseEntity {
    textArr: QuestionText[];
    creatorID: string;
    isDefault: boolean;
    timestemp: number;
    questionType: Type;
    min?: number;
    max?: number;
}



export interface MedicalAdditions extends BaseEntity {
    name: string;
    description: string;
    creatorId?: string;
    patientId?: string;
    additionType: AddPopupType;
}

export interface BaseDoctorDetails {
    username: string;
    password: string;
    user: string;
}

export interface BasePatient {
    firstName: string;
    lastName: string;
    creatorID: string;
    startHour?: number;
    endHour?: number;
    phoneNumber: string;
    language?: Language;
}


export interface Patient extends BaseEntity {
    firstName: string;
    lastName: string;
    creatorID: string;
    phoneNumber: string;
    language: Language;
    startHour: number;
    endHour: number;
    questions: Question[];
    treatments: MedicalAdditions[];
    medications: MedicalAdditions[];

}

export interface Doctor extends BaseEntity {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    phoneNumber: string;
    creatorID: string;
    mainLanguage: Language;
    languages: Language[];

}

export interface Admin extends BaseEntity {
    username: string;
    password: string;
    hospitalName: string;

}



