import {FC, PropsWithChildren} from 'react';

const CreateButton: FC<PropsWithChildren> = ({children}) => {
  return <div className='grid grid-cols-2 gap-4'>{children}</div>;
};

export default CreateButton;
