import {prisma} from '@/shared/lib/db';
import {Button} from '@/shared/ui/button';

export default async function Home() {
  const games = await prisma?.game?.findMany();

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
