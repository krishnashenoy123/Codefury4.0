import React from "react";

export default function Content({ prop }) {
	return (
		<div>
			List
			<ol>
				{prop.map((x) => {
					console.log(x);
					return <li id={x}>{x}</li>;
				})}
			</ol>
		</div>
	);
}
