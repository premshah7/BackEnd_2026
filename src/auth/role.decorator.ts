import { SetMetadata } from "@nestjs/common";
import { RoleType } from "src/role/role.entity";

export const ROLE_KEY = 'role';
export const Role = (...roles: RoleType[]) => SetMetadata(ROLE_KEY, roles);