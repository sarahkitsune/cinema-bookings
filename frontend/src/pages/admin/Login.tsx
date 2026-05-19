import { useState, type SubmitEvent } from "react";
import { Button } from "flowbite-react";
import { loginRequest } from "../../services/authService";
import { saveAuthToken } from "../../services/authSession";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: SubmitEvent) => {
		e.preventDefault();
		setError("");

		try {
			const data = await loginRequest(email, password);
			console.log(data);
			
			if (data.token) {
				saveAuthToken(data.token);
				window.location.href = "/admin";
			}
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (

		<div id="main">
			<h1>Hi! login to admin panel:</h1>
			

			<form className="max-w-sm mx-auto" onSubmit={handleLogin}>
				<div className="mb-5">
					<label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
					<input type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" value={email} onChange={(e) => setEmail(e.target.value)} />
					<p className={`text-red-500 text-sm mt-2 ${error ? "" : "hidden"}`}>{error.toLowerCase().includes("email") ? error : ""}</p>
				</div>
				<div className="mb-5">
					<label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
					<input type="password" id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
					<p className={`text-red-500 text-sm mt-2 ${error ? "" : "hidden"}`}>{error.toLowerCase().includes("password") ? error : ""}</p>
				</div>
				<label htmlFor="remember" className="flex items-center mb-5">
					<input id="remember" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
					<p className="ms-2 text-sm font-medium text-heading select-none">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</p>
				</label>
				<Button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</Button>
			</form>

		</div>
	)
}