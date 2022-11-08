import {AppAbility} from "../casl-ability.factory";


interface IPolicyHandler {
    handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export type PolicyHandler = PolicyHandlerCallback | IPolicyHandler