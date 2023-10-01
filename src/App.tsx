import type { Component } from "solid-js";
import "./index.css";
import "@fontsource-variable/source-code-pro";

import ResponseHeadersForm from "./components/ResponseHeadersForm";

const App: Component = () => {
  return (
    <div class={"px-3 pt-14 pb-6 min-h-screen flex flex-col relative"}>
      <div class="flex-1 flex flex-col justify-center">
        <div>
          <h1 class="text-2xl md:text-4xl text-center mb-12 max-w-lg mx-auto">
            View an HTTP Request's Response Headers
          </h1>

          <ResponseHeadersForm />
        </div>
      </div>
      <footer class="text-center pt-12">
        A little tool from <a href="https://macarthur.me">Alex MacArthur</a>.
      </footer>
    </div>
  );
};

export default App;
