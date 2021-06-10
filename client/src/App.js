import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Draw from './pages/draw'
import Home from './pages/home'
import Chat from './pages/chat'
import Nav from './components/nav'
import { ProvideSox } from "./hooks/useSox"
function App() {
  return (
    <ProvideSox>
      <Router>
        <Nav />
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/draw">
            <Draw />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ProvideSox>
  );
}

export default App;
