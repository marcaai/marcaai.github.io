import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import './App.css';
import { createUseStyles } from 'react-jss';
import logo from './logo.svg';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Marca AI</p>
          <form className={classes.form}>
            {/* <label htmlFor="x">Name:</label> */}
            <TextField label="Usuário" variant="standard" />
            <TextField label="Senha" variant="standard" />
            <Button variant="contained">Contained</Button>
          </form>
        </header>
      </div>
    </ThemeProvider>
  );
}

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: 160,

    // border: '1px solid #eee',
  },
});

export default App;
