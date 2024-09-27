import React from "react";

const UrlExpired = () => {
	return (
		<div className="flex items-start justify-center h-screen bg-gray-100 pt-20">
			<div className="bg-white shadow-lg rounded-lg p-8 text-center">
				<h1 className="text-4xl font-bold text-red-500 mb-4">URL Expired</h1>
				<p className="text-gray-600">
					Your URL has expired. Please renew your plan to get more visits.
				</p>
			</div>
		</div>
	);
};

export default UrlExpired;
