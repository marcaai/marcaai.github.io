import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import './App.css';
import { useNextinAPI } from './apis/nextin-api';
import { axiosSetup } from './utils/axios-setup';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

axiosSetup();

function App() {
  const { nextinLogon } = useNextinAPI();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const classes = useStyles();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const response = await nextinLogon(username, password);
      setKey(response.data.token.uid);

      console.log('xxxx');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>Gerador de chave Nextin</p>
          <form className={classes.form}>
            {/* <label htmlFor="x">Name:</label> */}
            <TextField
              label="Usuário"
              variant="standard"
              value={username}
              onChange={onChangeUsername}
            />
            <TextField
              label="Senha"
              variant="standard"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
            <Button variant="contained" onClick={onSubmit}>
              Gerar chave
            </Button>

            {!_.isEmpty(key) && (
              <div>
                <br />
                Chave: {key}
              </div>
            )}
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
    width: 300,

    // border: '1px solid #eee',
  },
});

export default App;
