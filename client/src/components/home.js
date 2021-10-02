import React from "react";
import { useState } from "react";
import names from "../pages";
import Content from "./content";

export default function Home() {
	const [name, setname] = useState(names);
	const [val, setval] = useState("");
	const handleChange = (e) => {
		setval(e.target.value);
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const newName = name;
		newName.push(val);
		setname(newName);
		setval("");
	};

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<input type="text" id="name" onChange={handleChange} />
				<input type="submit" value="Submit" />
			</form>
			<Content prop={name} />
		</div>
	);
}
