import { Provider } from "react-redux";
import Division from "../src/pages/Division";
import "./App.css";
import store from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <Division />
    </Provider>
  );
}

export default App;
