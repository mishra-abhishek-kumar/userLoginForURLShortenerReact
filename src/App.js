import Signin from "./components/signin/SignIn";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import Error from "./components/error/Error";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Url from "./components/user/User";
import UserDashboard from "./components/userDashboard/UserDashboard";
import UrlExpired from "./components/error/UrlExpired";
import EditParameters from "./components/editparameters/EditParameters";
import BuyPremium from "./components/butpremium/BuyPremium";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Home />} path="/" exact />
				<Route element={<Signin />} path="/sign-in" exact />
				<Route element={<SignUp />} path="/sign-up" exact />
				<Route element={<Dashboard />} path="/dashboard" exact />
				<Route element={<UserDashboard />} path="/user-dashboard" exact />
				<Route element={<Url />} path="/url/:userId" />
				<Route element={<EditParameters />} path="/edit-parameters" />
				<Route element={<BuyPremium />} path="/buy-premium" />
				<Route element={<Error />} path="/*" exact />
				<Route element={<UrlExpired />} path="/url-expired" exact />
			</Routes>
		</>
	);
}

export default App;
