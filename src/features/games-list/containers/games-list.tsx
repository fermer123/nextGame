import {getIdleGames} from '@/entities/game/server';
import {Layout} from '../ui/layout';
import {GameCard} from '../ui/game-card';
import CreateButton from '../ui/create-button';

const GamesList = async () => {
  const games = await getIdleGames();
  return (
    <Layout actions={<CreateButton action={() => {}} />}>
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

export default GamesList;
