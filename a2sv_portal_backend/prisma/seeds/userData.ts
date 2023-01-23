import { RoleEnum, StatusEnum } from "@prisma/client"

export const userData =[
    {
   
        "email": "adona@a2sv.org",
        "password":  '$2b$10$meWlkGCFEHkP/serox2RGuOr3LQJBnPLweHt3ZmL0S0yBbSbg9Tnm',
        // "firstName": "Adona ",
        // "lastName": "Tesfaye",
        // "middleName": "T",
        "role": RoleEnum.STUDENT,
        "status": StatusEnum.ACTIVE
    },
    {
        "email": "nathnael.akale@a2sv.org",
        "password":  '$2b$10$meWlkGCFEHkP/serox2RGuOr3LQJBnPLweHt3ZmL0S0yBbSbg9Tnm',
        // "firstName": "Nati ",
        // "lastName": "Yewendosen",
        // "middleName": "Y",
        "role": RoleEnum.HEAD_OF_EDUCATION,
        "status": StatusEnum.ACTIVE
    },
    {
        "email": "emre@a2sv.org",
        "password":  '$2b$10$meWlkGCFEHkP/serox2RGuOr3LQJBnPLweHt3ZmL0S0yBbSbg9Tnm',
        // "firstName": "Emre ",
        // "lastName": "Varol",
        // "middleName": "V",
        "role": RoleEnum.HEAD_OF_ACADEMY,
        "status": StatusEnum.ACTIVE
    },
    {
        "email": "beza@a2sv.org",
        "password":  '$2b$10$meWlkGCFEHkP/serox2RGuOr3LQJBnPLweHt3ZmL0S0yBbSbg9Tnm',
        // "firstName": "Beza ",
        // "lastName": "Tsegaye",
        // "middleName": "T",
        "role": RoleEnum.STUDENT,
        "status": StatusEnum.ACTIVE
    },
    {
        "email": "hanna@a2sv.org",
        "password":  '$2b$10$meWlkGCFEHkP/serox2RGuOr3LQJBnPLweHt3ZmL0S0yBbSbg9Tnm',
        // "firstName": "Hanna ",
        // "lastName": "Samuel",
        // "middleName": "S",
        "role": RoleEnum.STUDENT,
        "status": StatusEnum.ACTIVE
    }
]

export default userData