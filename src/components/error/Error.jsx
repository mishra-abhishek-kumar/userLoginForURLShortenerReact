import React from "react";

const Error = () => {
	return (
		<div className="flex items-start justify-center min-h-screen bg-gray-100 pt-20">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-700">404</h1>
				<p className="text-2xl mt-4 text-gray-600">Oops! Page not found.</p>
				<p className="mt-2 text-gray-500">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<a
					href="/"
					className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
				>
					Go Back Home
				</a>
			</div>
		</div>
	);
};

export default Error;
