import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} /> 
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

      </Switch>

    </Router>    
    
  );
}
export default App;
