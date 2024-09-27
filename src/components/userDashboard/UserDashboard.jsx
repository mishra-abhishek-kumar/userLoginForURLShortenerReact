import React, { useState, useRef } from "react";
import Tables from "../../sharedCompenents/table/Tables";
import { isUser as isUserService } from "../../service/authService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { createShortUrl, getUserURLs } from "../../service/userService";
import { showSuccessToast, showInformationToast } from "../../utils/toastUtils";
import Logout from "../logoutbtn/Logout";

const UserDashboard = () => {
	const [isUser, setIsUSer] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const myParam = new URLSearchParams(location.search);
	const [searchParams, setSearchParams] = useSearchParams();
	// const [userId, setUserId] = useState();

	const [data, setData] = useState([]);
	const [page, setPage] = useState(() => myParam.get("page") || 1);
	const [limit, setLimit] = useState(() => myParam.get("limit") || 5);
	const [totalCountOfData, setTotalCountOfData] = useState();

	const isUserCheck = async () => {
		try {
			let isUser = await isUserService();
			if (isUser) {
				setIsUSer(true);
				return;
			}
			navigate("/");
		} catch (error) {
			showInformationToast("Please login again");
			navigate("/sign-in");
		}
	};

	const [longUrl, setLongUrl] = useState(() => myParam.get("longUrl") || "");
	const [inputUrl, setInputUrl] = useState("");
	const [shortUrl, setShortUrl] = useState(() => myParam.get("shortUrl") || "");
	const [lowerLimit, setLowerLimit] = useState(
		() => myParam.get("lowerLimit") || ""
	);
	const [upperLimit, setUpperLimit] = useState(
		() => myParam.get("upperLimit") || ""
	);
	const [isRenewed, setIsRenewed] = useState(
		() => myParam.get("isRenewed") || ""
	);
	const [isExpired, setIsExpired] = useState(
		() => myParam.get("isExpired") || ""
	);
	const [flag, setFlag] = useState(false);

	const getUrls = async () => {
		try {
			let response = await getUserURLs(
				{
					limit,
					page,
					longUrl,
					shortUrl,
					lowerLimit,
					upperLimit,
					isRenewed,
					isExpired,
				},
				{}
			);
			setData(response?.data);
			setTotalCountOfData(response?.headers["x-total-count"]);
		} catch (error) {
			alert(error.message);
		}
	};

	const createUrl = async (inputUrl) => {
		try {
			let response = await createShortUrl(inputUrl);
			setShortUrl(response?.data);
			showSuccessToast("Short Url generated successfully");
		} catch (error) {
			// alert(error.message)
			showInformationToast(error.message);
			console.log(error.message);
		}
	};

	useEffect(() => {
		isUserCheck();
	}, []);

	useEffect(() => {
		if (inputUrl) {
			// Call createUrl and wait for it to complete
			createUrl(inputUrl)
				.then(() => {
					// Once the URL is created, call getUrls to fetch the latest list
					getUrls();
				})
				.catch((error) => {
					console.error("Error creating URL:", error);
				});
		}
	}, [inputUrl]);

	useEffect(() => {
		getUrls();
	}, [limit, page, flag]);

	const form = useRef();
	const handleSubmit = (e) => {
		e.preventDefault();
		setInputUrl(form.current.elements["inputUrl"].value);
		form.current.reset();
	};

	const handleReset = (e) => {
		e.preventDefault();
		setLongUrl("");
		setShortUrl("");
		setLowerLimit("");
		setUpperLimit("");
		setIsRenewed("");
		setIsExpired("");
		setSearchParams({});
		setFlag((prev) => !prev);
	};

	return (
		<>
			{isUser && (
				<>
					<Logout />
					<div className="flex items-start justify-center max-h-fit pt-12 ">
						<div className="bg-white rounded-lg p-8 w-4/5 md:w-3/5 lg:w-2/5">
							<h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
								Generate your short URL
							</h2>
							<form
								ref={form}
								className="flex space-x-4"
								onSubmit={handleSubmit}
							>
								<input
									type="text"
									id="inputUrl"
									placeholder="Enter your URL"
									className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
								>
									Generate
								</button>
							</form>
						</div>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							setPage(1);
							setSearchParams({
								...searchParams,
								longUrl,
								shortUrl,
								lowerLimit,
								upperLimit,
								isRenewed,
								isExpired,
								limit,
								page: 1,
							});
							getUrls();
						}}
						className="flex items-center px-5"
					>
						<div className="grid gap-6 mb-6 md:grid-cols-6 mt-10">
							<div>
								<input
									type="text"
									id="long_url"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="LONGURL"
									onChange={(e) => setLongUrl(e.target.value)}
									value={longUrl}
								/>
							</div>
							<div>
								<input
									type="text"
									id="short_url"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="SHORTURL"
									onChange={(e) => setShortUrl(e.target.value)}
									value={shortUrl}
								/>
							</div>
							<div>
								<input
									type="text"
									id="no_of_times_visited"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="LOWER LIMIT OF NOOFTIMESVISITED"
									onChange={(e) => setLowerLimit(e.target.value)}
									value={lowerLimit}
								/>
							</div>
							<div>
								<input
									type="text"
									id="lower_limit_url"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="UPPER LIMIT OF NOOFTIMESVISITED"
									onChange={(e) => setUpperLimit(e.target.value)}
									value={upperLimit}
								/>
							</div>
							<div>
								<input
									type="text"
									id="is_renewed"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="ISRENEWED"
									onChange={(e) => setIsRenewed(e.target.value)}
									value={isRenewed}
								/>
							</div>
							<div>
								<input
									type="text"
									id="is_expired"
									className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="ISEXPIRED"
									onChange={(e) => setIsExpired(e.target.value)}
									value={isExpired}
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

export default UserDashboard;
