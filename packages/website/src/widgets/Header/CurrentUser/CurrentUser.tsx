import {User} from '@prisma/client';
import s from './CurrentUser.module.scss';
import clsx from 'clsx';
import AppButton from '@/shared/ui/AppButton/AppButton.tsx';

interface CurrentUserProps {
  user: User;
  onLogout: () => void;
}

function CurrentUser({user, onLogout}: CurrentUserProps) {
  return (
    <div className={clsx(s.container)}>
      <p className={clsx(s.name)}>
        {user.firstName} {user.lastName} | {user.email}
      </p>
      <AppButton text={'Logout'} onClick={() => onLogout()} />
    </div>
  );
}

export default CurrentUser;
