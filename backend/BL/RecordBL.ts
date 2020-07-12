import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin, IDoctor, IPatient, Answer, IRecord } from '../models';
import { Language } from "../enums";

export class RecordBL {

    private static dal: Dal = new Dal();





    createRecord(record :  IRecord ):Promise<IRecord> {

       
        return new Promise((resolve , reject)=>{

            let answers : Answer[] = record.answerArr.map( ( a : Answer) => { return { questionId : a.questionId , answer : a.answer  } });
            record.answerArr = answers;
            
            RecordBL.dal.getPatientByPhoneNumber(record.patientId.replace(/-/gi, "")).then((patient : IPatient)=>{
   
               record.patientId = patient._id;


              
               RecordBL.dal.saveRecord(record).then((newRecord : IRecord)=>{
                RecordBL.dal.updatePatientLastSeen(newRecord.patientId);
                    
                    return resolve(newRecord);
                   
               }).catch((err)=>{
                   console.log(err);
                   return reject(err);
                   
               })
   
   
            }).catch((err)=>{
               console.log(err);
               return reject(err);
            })


        })

    }
}



// let answers : Answer[] = answerArr.arr.map( ( a : Answer) => { return { questionId : a.questionId , answer : a.answer  } });
// console.log(answers);

// RecordBL.dal.getPatientByPhoneNumber(phonenumber).then((foundPatient : IPatient)=>{

//    let patientID : string = foundPatient._id;

//    let record : IRecord = {patientID : patientID , answerArr : answerArr };

//    RecordBL.dal.saveRecord(record);



// }).catch(()=>{})

// console.log(body);
// console.log(phonenumber);



// }