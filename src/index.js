import ReactDom from "react-dom";
import SimpleForms from "./Components/SimpleForms/SimpleForms";
import "./index.css"

const App = () => {

  return (
    <SimpleForms />
  )
}

ReactDom.render(<App />, document.getElementById("root"));