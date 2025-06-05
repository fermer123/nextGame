import cuid from 'cuid';
import {TPlayer} from '../domain';
import {gameRepository} from '../repositories/game';
import {left} from '@/shared/lib/either';

export async function createGame(player: TPlayer) {
  const playerGames = await gameRepository.gameList({
    status: 'idle',
    id: cuid(),
    players: {some: {id: player?.id}},
  });
  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === 'idle' && game.creator.id === player.id,
  );

  if (isGameInIdleStatus) {
    return left('can-create-only-one-game' as const);
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: 'idle',
    field: Array(9).fill(null),
  });

  return createdGame;
}
