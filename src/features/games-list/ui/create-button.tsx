import {Button} from '@/shared/ui/button';
import {FC} from 'react';

interface IProps {
  action: () => Promise<void>;
}

const CreateButton: FC<IProps> = ({action}) => {
  return <Button>Создать игру</Button>;
};

export default CreateButton;
