import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

const theme = createTheme({
    palette: {
      primary: {
        main: red[700]
    },
    },
  })

//   import { green } from "@mui/material/colors";

// const theme = createTheme({ 
//     palette: {
//         primary: green,
//     } 
// });

export default theme;
