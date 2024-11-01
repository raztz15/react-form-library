import { Form } from "./components/form/Form"
import { buttons, inputs } from "./components/form/FormData"

function App() {

  return (
    <>
      <div>
        <Form inputs={inputs} buttons={buttons} />
      </div>
    </>
  )
}

export default App
