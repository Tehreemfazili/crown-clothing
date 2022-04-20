import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import SignIn from "./routes/sign-in/sign-in";

const App = () => {
  return (
    <Routes>
      {/* routes tellss that now the component must have a route */}
      <Route path="/" element={<Navigation />}>
        {/* <Route path="/home" element={<Home />} /> // to render on the spection home path we can we /home and to render on the same path as of parent of the child component we use index */}
        <Route index element={<Home />} />
        {/* index is same as index={true} */}
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
