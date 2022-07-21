import { Suspense } from "react";
import "./App.css";
import Login from "./components/views/auth/Login/Login";
import Register from "./components/views/auth/Register/Register";
import Task from "./components/Task/Task";
import Error404 from "./components/views/Error404/Error404";
import Registered from "./components/views/Registered/Registered";
import Donate from "./components/views/Donate/Donate";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";



const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <RequireAuth>
                  <Task />
                </RequireAuth>
              </motion.div>
            }
          />
          <Route
            path="/donate"
            element={
              <RequireAuth>
                <motion.div
                  className="page"
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Donate />
                </motion.div>
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/registered/:teamID"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Registered />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Suspense fallback={<>...</>}>
                  <Error404 />
                </Suspense>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
