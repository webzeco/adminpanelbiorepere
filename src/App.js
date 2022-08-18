import AuthContextProvider from './contexts/AuthContextProvider';
import './App.css';
import Main from './Components/Main';
import auth from './config/firebase-conf';

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

export default App;
