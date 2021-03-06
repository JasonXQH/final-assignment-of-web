import React, { Suspense, lazy } from "react";
import "./style.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/loading";

const Home = lazy(() => import("./home"));
const Sign = lazy(() => import("./sign"));
const Register = lazy(() => import("./register"));
const Manage = lazy(() => import("./manage"));
const Douban = lazy(() => import("./douban"));
const Taobao = lazy(() => import("./taobao"));
const Maoyan = lazy(() => import("./maoyan"));
const Operas = lazy(() => import("./operas"));
const OperaForm = lazy(() => import("./operaform"));
const OperaCollection = lazy(() => import("./operaCollection"));
const OperaDetails = lazy(() => import("./operadetails"));
class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense
          fallback={
            <div className="loading">
              <Loading />
            </div>
          }
        >
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/manage" component={Manage} />
            <Route exact path="/login" component={Sign} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/douban" component={Douban} />
            <PrivateRoute exact path="/taobao" component={Taobao} />
            <PrivateRoute exact path="/maoyan" component={Maoyan} />
            <PrivateRoute exact path="/operas" component={Operas} />
            <PrivateRoute exact path="/operas/create" component={OperaForm} />
            <PrivateRoute
              exact
              path="/operas/collection"
              component={OperaCollection}
            />
             <PrivateRoute
              exact
              path="/operas/:id/details"
              component={OperaDetails}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
