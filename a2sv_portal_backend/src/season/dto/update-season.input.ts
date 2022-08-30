import { InputType } from "@nestjs/graphql";
import { PartialType } from "@nestjs/mapped-types";
import { CreateSeasonInput } from "./create-season.input";

@InputType()
export class UpdateSeasonInput extends PartialType(CreateSeasonInput) {}
