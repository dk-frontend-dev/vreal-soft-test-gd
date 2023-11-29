import clsx from 'clsx';
import s from './Header.module.scss';
import {Link} from 'react-router-dom';
import {Routes} from '@/shared/constants/routeConstants.ts';
import {removeItem} from '@/shared/lib/localStorageLib.ts';
import {ACCESS_TOKEN_KEY} from '@/shared/constants/commonConstants.ts';
import {useNavigate} from 'react-router';
import {useStore} from '@/store/store.ts';
import CurrentUser from '@/widgets/Header/CurrentUser/CurrentUser.tsx';

function Header() {
  const {currentUser, setCurrentUser} = useStore();
  const navigate = useNavigate();

  const logout = () => {
    navigate(Routes.LOGIN);
    removeItem(ACCESS_TOKEN_KEY);
    setCurrentUser(null);
  };

  return (
    <header className={clsx(s.section)}>
      <div className={clsx('container', s.container)}>
        <Link to={Routes.HOME}>
          <img src={'/logo.svg'} width={70} height={70} alt={'Logo of test task project'} />
        </Link>

        {currentUser && <CurrentUser user={currentUser} onLogout={() => logout()} />}
      </div>
    </header>
  );
}

export default Header;
