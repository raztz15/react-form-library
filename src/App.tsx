import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Form } from "./components/form/Form"
import { buttons, inputsGroups } from "./components/form/FormData"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form buttons={buttons} inputsGroups={inputsGroups} submitUrl="https://jsonplaceholder.typicode.com/posts" successSubmitionUrl="/success" useLocalStorage={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
