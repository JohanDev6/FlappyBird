import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'

import { IProviderData } from './interfaces/mainInterfaces'
import { MainProvider, MainContext } from './providers/mainProvider'

import Routes from './routes';
import GlobalStyles from './styles/globalStyles'

const Root = () => {

  const { data } : IProviderData | any = useContext(MainContext)

  return(
      <ThemeProvider theme={data?.theme}>
          <GlobalStyles/>
          <Routes/>
      </ThemeProvider>
  )
}

ReactDOM.render(
  <MainProvider>
    <Root/>
  </MainProvider>
  ,
  document.getElementById('root')
);
