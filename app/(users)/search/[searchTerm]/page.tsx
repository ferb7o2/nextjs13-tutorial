import React from "react";

type PageProps = {
	params: {
		searchTerm: string;
	};
};

type SearchResult = {
	organic_results: [
		{
			position: number;
			title: string;
			link: string;
			thumbnail: string;
			snippet: string;
		}
	];
};

const search = async (searchTerm: string) => {
	try {
		const res = await fetch(
			`https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
		);

		const data: SearchResult = await res.json();
		return data;
	} catch (error) {
		throw new Error("Whoops something broke!");
	}
};

async function SearchResults({ params: { searchTerm } }: PageProps) {
	const searchResults = await search(searchTerm);
	return (
		<div>
			<p className="text-sm text-gray-500">You searched for: {searchTerm}</p>

			<ol className="p-5 space-y-5">
				{searchResults.organic_results.map((result) => (
					<li key={result.position} className="list-decimal">
						{" "}
						<p className="font-bold">{result.title}</p>
						<p>{result.snippet}</p>
					</li>
				))}
			</ol>
		</div>
	);
}

export default SearchResults;
