import {getIdleGames} from '@/entities/game/server';
import {Layout} from '../ui/layout';
import {GameCard} from '../ui/game-card';
import CreateButton from './create-button';

export const GamesList = async () => {
  const games = await getIdleGames();
  return (
    <Layout actions={<CreateButton />}>
      {games?.map((el) => (
        <GameCard
          key={el?.id}
          login={el?.creator?.login}
          rating={el?.creator?.rating}
        />
      ))}
    </Layout>
  );
};
