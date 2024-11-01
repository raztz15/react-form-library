import { Form } from "./components/form/Form"
import { buttons, inputs, title } from "./components/form/FormData"

function App() {

  return (
    <>
      <div>
        <Form inputs={inputs} buttons={buttons} title={title} />
      </div>
    </>
  )
}

export default App
