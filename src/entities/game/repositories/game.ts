import {prisma} from '@/shared/lib/db';
import {TGame, TGameIdle, TGameOver} from '../domain';
import {Game, Prisma, User} from '@/generated/prisma';
import {z} from 'zod';

import {removePassword} from '@/shared/lib/password';

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {players: User[]; winner: User | null},
): TGame {
  const players = game?.players?.map(removePassword);
  const [creator] = game.players;
  if (!creator) {
    throw new Error('creator should be in game idle');
  }
  switch (game?.status) {
    case 'idle':
      return {
        id: game?.id,
        field: fieldSchema?.parse(game?.field) || [],
        creator,
        status: game?.status,
      } satisfies TGameIdle;
    case 'inProgress':
    case 'gameOverDraw':
      return {
        id: game?.id,
        players: players,
        status: game?.status,
        // field: fieldSchema?.parse(game?.field) || [],
        field: [],
      };
    case 'gameOver':
      if (!game?.winner) {
        throw new Error('winner should be');
      }
      return {
        id: game?.id,
        players: players,
        status: game?.status,
        // field: fieldSchema?.parse(game?.field) || [],
        field: [],
        winnerId: removePassword(game?.winner),
      } satisfies TGameOver;
  }
}

async function gameList(where?: Prisma.GameWhereInput): Promise<TGame[]> {
  const games = await prisma?.game?.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });
  return games?.map(dbGameToGameEntity);
}

async function createGame(game: TGame): Promise<TGame> {
  const createGame = await prisma?.game?.create({
    data: {
      status: game?.status,
      id: game?.id,
      field: Array(9).fill(0),
      players: {
        connect: {
          id: game?.id,
        },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createGame);
}
export const gameRepository = {
  gameList,
  createGame,
};
