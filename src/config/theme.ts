import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();

const theme = createTheme({
  palette: {
    // mode: 'dark',
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiFormControlLabel-label.Mui-disabled': {
            color: palette.text.secondary,
          },
        },
      },
    },
  },
});

export default theme;
