/* src/app/admin/admin.interface.ts*/


export interface AdminUser{
    id: number | string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    birthday: Date | null;
    gender: string;
    email: string;
    mobile: string | null;
    role: string;
    admin_username: string;
    password: string;

}