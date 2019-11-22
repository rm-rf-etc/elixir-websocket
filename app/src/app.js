import React, { useState, useCallback, useRef } from "react";
import "./index.css";
import { publicKey } from "./util/crypto";
import { Node } from "./graph";


const node1 = new Node("node1");

node1.on(["label", "group"], (data) => {
	console.log("value:", data);
});

const submitWrite = (predicate, value) => node1.write(predicate, value);

const App = () => {
	const [fname, setFirstName] = useState("");
	const [lname, setLastName] = useState("");

	const fnameRef = useRef("");
	const lnameRef = useRef("");

	fnameRef.current = fname || "";
	lnameRef.current = lname || "";

	const submit = useCallback(() => {
		submitWrite("first_name", fnameRef.current);
		submitWrite("last_name", lnameRef.current);
	}, []);
	const typingFirstName = useCallback(({ target }) => setFirstName(target.value), []);
	const typingLastName = useCallback(({ target }) => setLastName(target.value), []);

	const doRead = useCallback(() => {
		node1.read("first_name", (data) => setFirstName(data.first_name));
		node1.read("last_name", (data) => setLastName(data.last_name));
	}, []);

	return (
		<div className="App">
			<div>
				<label htmlFor="pubkey">Public Key: </label>
				<input name="pubkey" className="monospace" value={publicKey()} readOnly />
			</div>
			<div>
				<label htmlFor="first_name">First Name: </label>
				<input name="first_name" onChange={typingFirstName} value={fnameRef.current} />
			</div>
			<div>
				<label htmlFor="last_name">Last Name: </label>
				<input name="last_name" onChange={typingLastName} value={lnameRef.current} />
			</div>
			<button onClick={submit}>Write</button>
			<button onClick={doRead}>Read</button>
		</div>
	);
}

export default App;
