import { Prisma } from '@prisma/client';

export type ReviewCreate = Omit<Prisma.ReviewCreateInput, 'recipe' | 'user'>;
