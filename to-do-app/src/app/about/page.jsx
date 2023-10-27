import React from "react";
import Head from "next/head";
import Header from "../header/page";

const About = () => {
	return (
		<div>
			<Head>
				<title>Acerca</title>
				<link rel="icon" href="../../assets/logo-nextjs.png" />
			</Head>
			<Header />
			<div className="mobile-container">
				<main className="container mx-auto mt-5">
					<h1 className="text-4xl font-bold mb-4">Acerca</h1>
					<p>
						Este Proof of Concept fue desarrollado usando{" "}
						<a
							href="https://github.com/MVRU/NextJS-PoC"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 font-bold hover:underline"
						>
							<span className="hover:underline">NextJS</span>
						</a>
						.
					</p>
					<p className="mt-4 font-bold">Creado por:</p>
					<ul className="list-disc list-inside mt-2">
						<li>Alejo Retamal - 46950</li>
						<li>Renzo Fascendini - 43075</li>
						<li>Marina Milo - 48042</li>
					</ul>
				</main>
			</div>
		</div>
	);
};

export default About;
