import cuid from 'cuid';
import {TGameIdle, TPlayer} from '../domain';
import {gameRepository} from '../repositories/game';

export async function createGame(player: TPlayer): Promise<TGameIdle[]> {
  const games = await gameRepository.gameList({
    status: 'idle',
    id: cuid(),
    players: {some: {id: player?.id}},
  });

  return games as TGameIdle[];
}
