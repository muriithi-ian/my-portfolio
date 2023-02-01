import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import workspace from "../workspace.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
const builder = imageUrlBuilder(sanityClient);
const override = css`
	display: block;
	margin: 0 auto;
	border-color: #38a169;
`;
function urlFor(source) {
	return builder.image(source);
}

export default function About() {
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "author"]{
          name,
          bio,
          "authorImage": image.asset->url
      }`
			)
			.then((data) => setAuthor(data[0]))
			.catch(console.error);
	}, []);


	return (
		<main className="relative">
			<img
				src={workspace}
				alt="Work Space"
				className="fixed object-cover w-full h-full"
			/>
			<div className="p-10 lg:pt-48 container mx-auto relative">
				{!author ? (
					<ClipLoader color="#38A169" css={override} size={150} />
				) : (
					<section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
						<img
							src={urlFor(author.authorImage).url()}
							className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
							alt="Muritihi Ian"
						/>
						<div className="text-lg flex flex-col justify-center">
							<h1 className="cursive text-6xl text-green-300 mb-4">
								Hey there. I'm{" "}
								<span className="text-green-100">{author.name}</span>
							</h1>
							{author?.bio.map((bio) => (
								<p className="text-green-200 text-lg overflow-auto text-justify" key={bio["_key"]}>
									{bio['children'][0]['text']+"\n"}
								</p>
								//q: align text center tailwind css
								//a: https://stackoverflow.com/questions/64800000/how-to-align-text-center-in-tailwind-css
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}
