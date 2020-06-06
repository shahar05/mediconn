"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = require("../DAL/dal");
var AdminBL = /** @class */ (function () {
    function AdminBL() {
    }
    AdminBL.prototype.login = function (admin) {
        return new Promise(function (resolve, reject) {
            AdminBL.dal.getAdminByLogin(admin.username, admin.password, admin.hospitalName).then(function (res) {
                resolve(res);
            });
        });
    };
    AdminBL.dal = new dal_1.Dal();
    return AdminBL;
}());
exports.AdminBL = AdminBL;
