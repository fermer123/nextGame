'use client';

import {Button} from '@/shared/ui/button';
import {FC} from 'react';
import {createGameAction} from '../actions/create-game';
import {mapLeft, right} from '@/shared/lib/either';
import {useActionState} from '@/shared/lib/react';

const CreateButton: FC = () => {
  const [state, action, isPending] = useActionState(
    createGameAction,
    right(undefined),
  );

  return (
    <Button
      disabled={isPending}
      onClick={action}
      error={mapLeft(
        state,
        (e) =>
          ({
            ['can-create-only-one-game']: 'Только одна игра',
            ['user-not-found']: 'Нет пользователя',
          })[e],
      )}>
      Создать игру
    </Button>
  );
};

export default CreateButton;
