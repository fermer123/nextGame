import {prisma} from '@/shared/lib/db';

export default async function Home() {
  const games = await prisma?.game?.findMany();
  console.log('games', games);
  return (
    <div className='flex flex-col gap-4 container mx-auto pt-[100px]'>
      <h1 className='text-4xl font-bold'>Игры</h1>
      {/* <GamesList /> */}
    </div>
  );
}
