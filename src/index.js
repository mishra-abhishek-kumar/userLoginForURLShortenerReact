import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
		<ToastContainer
			hideProgressBar={true}
			closeOnClick={true}
			pauseOnHover={false}
			draggable
			theme="colored"
		/>
	</BrowserRouter>
);
