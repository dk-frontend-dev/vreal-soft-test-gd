import {createTheme} from "@mui/material";

export const globalTheme = createTheme({
    typography: {
        htmlFontSize: 16,
    },
    components: {
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
})
