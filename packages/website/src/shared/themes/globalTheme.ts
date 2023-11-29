import {createTheme} from '@mui/material';

export const globalTheme = createTheme({
  typography: {
    htmlFontSize: 16
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginBottom: '10px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: '320px',
          marginBottom: '15px'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          minWidth: '320px',
          maxWidth: '640px',
          width: '100%',
          marginBottom: '15px'
        }
      }
    }
    // MuiButton: {
    //     styleOverrides: {
    //         sizeMedium: {
    //           fontSize: 16,
    //         },
    //         outlined: {
    //             borderColor: 'red',
    //         }
    //     }
    // }
  },
  palette: {
    primary: {
      main: '#000'
    }
  }
});
