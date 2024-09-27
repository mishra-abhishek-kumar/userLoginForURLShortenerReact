import React, { useEffect, useState } from "react";
import { getAllUser } from "../../service/userService";
import Tables from "../../sharedCompenents/table/Tables";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isAdmin as isAdminService } from "../../service/authService";
import { showInformationToast } from "../../utils/toastUtils";
import Logout from "../logoutbtn/Logout";

const Dashboard = () => {
	const navigation = useNavigate();
	const location = useLocation();
	const myParam = new URLSearchParams(location.search);
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(() => myParam.get("page") || 1);
	const [limit, setLimit] = useState(() => myParam.get("limit") || 5);
	const [totalCountOfData, setTotalCountOfData] = useState();
	const [isAdmin, setisAdmin] = useState(false);

	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setisAdmin(true);
				return;
			}
			navigation("/");
		} catch (error) {
			showInformationToast("Please login again");
			navigation("/sign-in");
		}
	};
	const [firstName, setFirstName] = useState(
		() => myParam.get("firstName") || ""
	);
	const [lastName, setLastName] = useState(() => myParam.get("lastName") || "");
	const [email, setEmail] = useState(() => myParam.get("email") || "");
	const [lowerLimitUrls, setLowerLimitUrls] = useState(
		() => myParam.get("lowerLimitUrls") || ""
	);
	const [upperLimitUrls, setUpperLimitUrls] = useState(
		() => myParam.get("upperLimitUrls") || ""
	);
	const [flag, setFlag] = useState(false);

	const getUsers = async () => {
		try {
			let response = await getAllUser(
				{
					limit,
					page,
					firstName,
					lastName,
					email,
					lowerLimitUrls,
					upperLimitUrls,
				},
				{}
			);
			let data1 = response.data.map((d) => {
				return {
					...d,
					info: (
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
							onClick={(e) => navigation(`/url/${d.id}`)}
						>
							View
						</button>
					),
				};
			});
			setData(data1);
			// setData(response?.data);
			setTotalCountOfData(response?.headers["x-total-count"]);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		isAdminCheck();
	}, []);

	useEffect(() => {
		getUsers();
	}, [limit, page, flag]);

	const handleReset = (e) => {
		e.preventDefault();
		setFirstName("");
		setLastName("");
		setEmail("");
		setLowerLimitUrls("");
		setUpperLimitUrls("");

		setSearchParams({});

		setFlag((prev) => !prev);
	};

	return (
		<>
			{isAdmin && (
				<>
					<Logout />

					<div className="flex items-start justify-center max-h-fit pt-16">
						<h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
							Welcome, Abhishek
						</h2>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							setPage(1);
							setSearchParams({
								...searchParams,
								firstName,
								lastName,
								email,
								lowerLimitUrls,
								upperLimitUrls,
								limit,
								page: 1,
							});
							getUsers();
						}}
						className="flex items-center px-5"
					>
						<div className="grid gap-6 mb-6 md:grid-cols-5 mt-10">
							<div>
								<input
									type="text"
									id="first_name"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="FIRSTNAME"
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
								/>
							</div>
							<div>
								<input
									type="text"
									id="last_name"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="LASTNAME"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
								/>
							</div>
							<div>
								<input
									type="email"
									id="email"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="EMAIL"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div>
								<input
									type="text"
									id="lower_limit_url"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="LOWER LIMIT OF URLs"
									onChange={(e) => setLowerLimitUrls(e.target.value)}
									value={lowerLimitUrls}
								/>
							</div>
							<div>
								<input
									type="text"
									id="upper_limit_url"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="UPPER LIMIT OF URLs"
									onChange={(e) => setUpperLimitUrls(e.target.value)}
									value={upperLimitUrls}
								/>
							</div>

							<button
								type="submit"
								className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
							>
								SUBMIT
							</button>
							<button
								onClick={handleReset}
								className="bg-transparent border border-gray-300 text-gray-900 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
							>
								RESET
							</button>
						</div>
					</form>

					<Tables
						data={data}
						page={page}
						limit={limit}
						setLimit={setLimit}
						setPage={setPage}
						totalCountOfData={totalCountOfData}
					/>
				</>
			)}
		</>
	);
};

export default Dashboard;
