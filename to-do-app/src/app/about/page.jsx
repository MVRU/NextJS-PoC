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
			<main className="container mx-auto mt-5">
				<h1 className="text-4xl font-bold mb-4">Acerca</h1>
				<p>Esta página fue desarrollada usando NextJS.</p>
			</main>
		</div>
	);
};

export default About;
