import {prisma} from '@/shared/lib/db';
import {TGame, TGameIdle, TGameOver} from '../domain';
import {Game, Prisma, User} from '@/generated/prisma';
import {z} from 'zod';

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {players: User[]; winner: User | null},
): TGame {
  const [creator] = game.players;
  if (!creator) {
    throw new Error('creator should be in game idle');
  }
  switch (game?.status) {
    case 'idle':
      return {
        id: game?.id,
        // players: game?.players,
        field: fieldSchema.parse(game?.field),
        creator,
        status: game?.status,
      } satisfies TGameIdle;
    case 'inProgress':
    case 'gameOverDraw':
      return {
        id: game?.id,
        players: game?.players,
        status: game?.status,
        field: fieldSchema.parse(game?.field),
      };
    case 'gameOver':
      if (!game?.winner) {
        throw new Error('winner should be');
      }
      return {
        id: game?.id,
        players: game?.players,
        status: game?.status,
        field: fieldSchema.parse(game?.field),
        winnerId: game?.winner,
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

export const gameRepository = {
  gameList,
};
