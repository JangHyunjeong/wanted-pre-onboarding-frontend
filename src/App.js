import { Route, Routes } from "react-router-dom";

// styles
import "./styles/global.css";
import style from "./styles/App.module.css";

// components
import GlobalHeader from "./components/GlobalHeader";

// pages
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ToDo from "./pages/ToDo";
import Error from "./pages/Error";

function App() {
  return (
    <div className={style.wrap}>
      <GlobalHeader />

      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/todo" element={<ToDo></ToDo>}></Route>
          <Route path="/*" element={<Error></Error>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
