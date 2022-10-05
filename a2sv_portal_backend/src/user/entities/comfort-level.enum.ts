import {registerEnumType} from "@nestjs/graphql";

export enum ComfortLevel {
    COMFORTABLE = 'COMFORTABLE',
    UNCOMFORTABLE = 'UNCOMFORTABLE',
    MEDIOCRE = 'MEDIOCRE'
}

registerEnumType(ComfortLevel, {name: 'ComfortLevel'})