import { Role } from './role-enum.filter';
import { SetMetadata } from '@nestjs/common';

export const ACESS_KEY = 'roles';
export const Acess = (...role: Role[]) => SetMetadata(ACESS_KEY, role);
 