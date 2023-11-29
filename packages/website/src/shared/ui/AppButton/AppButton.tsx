import {Button, ButtonProps} from '@mui/material';

interface AppButtonProps extends ButtonProps {
  text: string;
}

function AppButton({text, ...props}: AppButtonProps) {
  return (
    <Button variant={'outlined'} size={'medium'} {...props}>
      {text}
    </Button>
  );
}

export default AppButton;
