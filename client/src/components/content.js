import React from "react";
import { Link } from "react-router-dom";
import names from "../pages";

export default function Content({ prop }) {
	return (
		<div>
			List
			<ol>
				{prop.map((x) => {
					console.log(x);
					return (
						<li id={x}>
							<Link to="/rooms/:"></Link>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
