import ReacDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
ReacDOM.render(<App />, document.querySelector("#root"));

serviceWorkerRegistration.register();
