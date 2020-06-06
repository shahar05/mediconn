export interface DBEntity {
    _id: string;
}

export interface User extends DBEntity {
    username: string;
    password: string;
}

export interface InnerRequest extends Request {
    user: User;
}

