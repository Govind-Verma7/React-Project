import { lazy, Suspense } from "react"
import Loader from "./Components/Loader/Loader"
const Board = lazy(() => import('./Components/Board/Board'))
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Board />
        <ToastContainer position="top-right" autoClose={2000}/>
      </Suspense>
    </>
  )
}

export default App
