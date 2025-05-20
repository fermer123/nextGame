import {prisma} from '@/shared/lib/db';
import {Button} from '@/shared/ui/button';

export default async function Home() {
  const games = await prisma?.game?.findMany();
  console.log(games);
  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
