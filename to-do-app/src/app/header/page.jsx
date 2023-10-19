import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<header className="flex items-center justify-between p-4 bg-gray-800 text-white">
			<div className="flex items-center">
				<div className="flex items-center text-white text-lg mr-3">
					<Link href="/">
						<img
							src="/assets/logo-nextjs.png"
							alt="Next.js"
							className="h-10 w-10 mr-2"
						/>
					</Link>
				</div>
				<Link href="/about" className="text-white text-lg">
					Acerca
				</Link>
			</div>
		</header>
	);
};

export default Header;
