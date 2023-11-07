import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
