import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./redux/store";
import Spinner from "./components/Loader";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner size="100" />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
