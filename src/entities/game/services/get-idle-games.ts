import {TGameIdle} from '../domain';
import {gameRepository} from '../repositories/game';

export async function getIdleGames(): Promise<TGameIdle[]> {
  const games = await gameRepository.gameList();
  return games?.filter((game) => game?.status === 'idle');
}
