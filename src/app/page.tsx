import {GamesList} from '@/features/games-list/containers/games-list.tsx';
import {prisma} from '@/shared/lib/db';

export default async function Home() {
  const games = await prisma?.game?.findMany();
  console.log('games', games);
  return (
    <div>
      <GamesList />
    </div>
  );
}
