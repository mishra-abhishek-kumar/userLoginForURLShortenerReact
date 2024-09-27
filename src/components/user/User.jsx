import React, { useEffect, useState } from "react";
import { getUserURLsforAdmin } from "../../service/userService";
import Tables from "../../sharedCompenents/table/Tables";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isAdmin as isAdminService } from "../../service/authService";

const User = () => {
	const navigation = useNavigate();
	const location = useLocation();
	const myParam = new URLSearchParams(location.search);
	const [searchParams, setSearchParams] = useSearchParams();
	const [userId, setUserId] = useState(location.pathname.split("/").pop());
	const [isAdmin, setisAdmin] = useState(false);

	const [data, setData] = useState([]);
	const [page, setPage] = useState(() => myParam.get("page") || 1);
	const [limit, setLimit] = useState(() => myParam.get("limit") || 5);
	const [totalCountOfData, setTotalCountOfData] = useState();

	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setisAdmin(true);
				return;
			}
			navigation("/");
		} catch (error) {
			navigation("/");
		}
	};

	const [longUrl, setLongUrl] = useState(() => myParam.get("longUrl") || "");
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

	const getUrls = async (userId) => {
		try {
			let response = await getUserURLsforAdmin(
				userId,
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

	useEffect(() => {
		isAdminCheck();
	}, []);

	useEffect(() => {
		getUrls(userId);
	}, [userId, limit, page, flag]);

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
					getUrls(userId);
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
	);
};

export default User;
