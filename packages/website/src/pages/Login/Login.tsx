import AppButton from '@/shared/ui/AppButton/AppButton.tsx';
import {Typography} from '@mui/material';
import s from './Login.module.scss';

function LoginPage() {
  const loginUser = () => {
    window.open(`http://localhost:3000/google`, '_self');
  };

  return (
    <section className={s.section}>
      <div className={'container'}>
        <Typography variant="h4" gutterBottom align={'center'}>
          Sign in / Sign up
        </Typography>
        <div className={s.button_container}>
          <AppButton onClick={() => loginUser()} text={'Login with google'} />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
