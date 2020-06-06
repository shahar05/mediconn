import { Dal } from "../DAL/dal"
import { IAdmin, IModelAdmin } from '../models';

export class AdminBL {
    private static dal: Dal = new Dal();
    login(admin: IAdmin) {
        return new Promise((resolve, reject) => {
            AdminBL.dal.getAdminByLogin(admin.username, admin.password, admin.hospitalName).then((res: IModelAdmin) => {
                resolve(res)
            })
        })
    }
} 