import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #38A169;
`;

export default function Project() {
	const [projectData, setProjectData] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "project"]{
          title,
          date,
          place,
          description,
          projectType,
          link,
          tags
      }`
			)
			.then((data) => setProjectData(data))
			.catch(console.error);
	}, []);

	return (
		<main className="bg-green-100 min-h-screen p-12">
			<section className="container mx-auto">
				<h1 className="text-5xl flex justify-center cursive">My Projects</h1>
				<h2 className="text-lg text-gray-600 flex justify-center mb-12">
					Welcome to my projects page!
				</h2>
				{!projectData ? (
					<ClipLoader color="#38A169" css={override} size={150} />
				) : (
					<section className="grid sm:grid-cols-2 gap-8 grid-cols-1">
						{projectData &&
							projectData.map((project, index) => (
								<article className="relative rounded-lg shadow-xl bg-white p-16 transform transition ease-in-out duration-500  hover:scale-105 hover:z-10">
									<h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
										<a
											href={project.link}
											alt={project.title}
											target="_blank"
											rel="noopener noreferrer"
										>
											{project.title}
										</a>
									</h3>
									<div className="text-gray-500 text-xs space-x-4">
										<span>
											<strong className="font-bold">Finished on</strong>:{" "}
											{new Date(project.date).toLocaleDateString()}
										</span>
										<span>
											<strong className="font-bold">Company</strong>:{" "}
											{project.place}
										</span>
										<span>
											<strong className="font-bold">Type</strong>:{" "}
											{project.projectType}
										</span>
										<p className="my-6 text-lg text-gray-700 leading-relaxed">
											{project.description}
										</p>
										<p>
											<strong className="font-bold">Tags</strong>:{" | "}
											{project.tags.map((tag) => (
												<span>{`${tag} | `}</span>
											))}
										</p>
										<a
											href={project.link}
											rel="noopener noreferrer"
											target="_blank"
											className="text-red-500 font-bold hover:underline hover:text-red-400 text-xl"
										>
											View The Project{" "}
											<span role="img" aria-label="right pointer">
												👉
											</span>
										</a>
									</div>
								</article>
							))}
					</section>
				)}
			</section>
		</main>
	);
}
