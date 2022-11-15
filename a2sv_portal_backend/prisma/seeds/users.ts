import { RoleEnum, Status } from "@prisma/client"

export const users =[
    {
        "email": "adona@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
    {
        "email": "beza@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
    {
        "email": "hanna@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
    {
        "email": "bontu@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
    {
        "email": "benazir@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
    {
        "email": "tsione@a2sv.org",
        "password": "123456789",
        "role": RoleEnum.STUDENT,
        "status": Status.ACTIVE
    },
]

export default users