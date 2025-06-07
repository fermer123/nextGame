'use client';

import {Button} from '@/shared/ui/button';
import {FC} from 'react';
import {createGameAction} from '../actions/create-game';
import {matchEither, right} from '@/shared/lib/either';
import {useActionState} from '@/shared/lib/react';

const CreateButton: FC = () => {
  const [state, action, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <div className='flex flex-col gap-1'>
      <Button disabled={isPending} onClick={action}>
        Создать игру
      </Button>
      {matchEither(state, {
        right: () => null,
        left: (e) =>
          ({
            ['can-create-only-one-game']: 'Только одна игра',
            ['user-not-found']: 'Нет пользователя',
          })[e],
      })}
    </div>
  );
};

export default CreateButton;
