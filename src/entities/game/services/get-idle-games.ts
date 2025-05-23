import {TGameIdle} from '../domain';
import {gameRepository} from '../repositories/game';

export async function getIdleGames(): Promise<TGameIdle[]> {
  const games = await gameRepository.gameList({
    status: 'idle',
  });
  return games as TGameIdle[];
}
