import Router from "./components/Router";
import { Route } from "./components/Route";
import Root from "./pages/Root";
import About from "./pages/About";

const App = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white", fontSize: "30px" }}>
      <Router>
        <Route path="/" component={<Root />}></Route>
        <Route path="/about" component={<About />}></Route>
      </Router>
    </div>
  );
};

export default App;
