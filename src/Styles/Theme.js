import { createTheme,responsiveFontSizes } from "@mui/material";
import { green,orange,yellow } from "@mui/material/colors";

var theme=createTheme({
    palette: {
        primary: {
          main: '#2f93e0',
        },
        white: {
          main: "ffffff",
        },
      },
      status: {
        danger: orange[500],
        success:green[500],
        info:yellow[500]
      },
      typography:{
          fontFamily:[
              'Roboto','Helvetica Neue','Arial','sans-serif'
          ].join(','),
          fontSize:14,
      },
      body1:{

      }
})
theme=responsiveFontSizes(theme)
export default theme;