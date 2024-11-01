import { Form } from "./components/form/Form"
import { buttons, inputsGroups } from "./components/form/FormData"

function App() {

  return (
    <>
      <Form buttons={buttons} inputsGroups={inputsGroups} />
    </>
  )
}

export default App
