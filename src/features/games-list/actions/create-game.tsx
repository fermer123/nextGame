'use server';

import {createGame} from '@/entities/game/server';
import {prisma} from '@/shared/lib/db';

export const createGameAction = async () => {
  const user = await prisma?.user?.findFirst();
  if (!user) {
    return {
      type: 'error',
      value: 'user-not-found',
    } as const;
  }
  const gameResult = createGame(user);
  return gameResult;
};
