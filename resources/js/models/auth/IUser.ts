import functionHelper from "~/libraries/formatHelpers/functionHelper";
import { IGetSubCategory } from "~/models/category/ICategory";

interface IUpdateUser {
    id: number,
    name: string,
    email: string,
    account_type: string,
    email_verified_at: string,
    profile: string | any,
    phone: string,
}
interface IUser extends IUpdateUser{
    created_at: string,
    updated_at: string,
    facebook_id: number,
}
interface IProfile {
    User: IUser;
}
interface IUserResponse {
    Users: IUser[],
}
interface IUserPaginate {
    current_page: number,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number,
    data: IUser[],
}
interface IUserWithPaginate {
    Users: IUserPaginate,
}
class Users implements IUser {
    id: number;
    name: string;
    email: string;
    account_type: string;
    email_verified_at: string;
    profile: string | any;
    phone: string;
    created_at: string;
    updated_at: string;
    facebook_id: number;
    constructor(init: IUser) {
        // noinspection TypeScriptValidateTypes
        Object.assign(this, init);
        this.created_at = functionHelper.dateStringTo12Hour(init.created_at);
        this.updated_at = functionHelper.dateStringTo12Hour(init.updated_at);
    }
}
class UsersPaginate implements IUserPaginate {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    data: IUser[];
    constructor(init: IUserPaginate) {
        // noinspection TypeScriptValidateTypes
        Object.assign(this, init);
        this.data = init.data.map((item: IUser) => new Users(item));
    }
}
export {
    IUser,
    IUserResponse,
    IUpdateUser,
    IProfile,
    IUserWithPaginate,
    UsersPaginate,
    IUserPaginate,
};
