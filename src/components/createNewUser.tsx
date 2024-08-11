import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";
export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);
	const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};
	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Aqui el nombre" />
				<TextInput name="email" placeholder="Aqui el email" />
				<TextInput name="github" placeholder="Aqui el usurio de github" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear ususario
					</Button>
					<span>
						{result === "ok" && (
							<Badge
								style={{
									marginLeft: "8px",
									borderRadius: "5px",
								}}
								color="green"
							>
								{" "}
								Guardado correctamente{" "}
							</Badge>
						)}
					</span>
					<span>
						{result === "ko" && (
							<Badge
								style={{
									marginLeft: "8px",
									borderRadius: "5px",
								}}
								color="red"
							>
								{" "}
								Error con los campos{" "}
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
}
