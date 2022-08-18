import React from 'react';
import { StateProvider } from './../StateContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from './../constants/theme';

import Header from './../Views/Header';
import Main from './../Views/Main';
import Footer from './../Views/Footer';
import LegalNoticePopup from './../Views/LegalNoticePopups/LegalNoticePopup';

const Payments = () => (
  <ThemeProvider theme={theme}>
    <StateProvider>
      <div style={{ flexGrow: 1 }}>
        <Header title="PAYMENT FORM" logoLink="/images/logo.png" />
        <Main />
        <Footer />
      </div>
      <LegalNoticePopup />
    </StateProvider>
  </ThemeProvider>
);

console.log(
  `%cPRODUCED AND DESIGNED BY\n      __      __\n     /\\ \\    / /\\\n    /  \\ \\  / /  \\\n   / /\\ \\ \\/ / /\\ \\\n  / ____ \\  / ____ \\\n /_/    \\_\\/_/    \\_\\ `,
  'color: #5d9cb3;'
);

export default Payments;
