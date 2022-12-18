import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	//salvado inputs 
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	//Erro para o usuario
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

		

		e.preventDefault();
		try {
			if (!data.firstName | !data.lastName  | data.email) {
				setError("Preencha todos os campos para se cadastrar");
				return;
			  } 
			  //vericação da regix email
			  if (!data.email.match(pattern)){
				setError("Email invalido")
				return
			  }

			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Bem-vindo</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Nova conta</h1>
						<input
							type="text"
							placeholder="Primeiro nome"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Sobrenome"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Senha"
							name="password"
							onChange={handleChange}
							value={data.password}
							
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.form_btn}>
							Criar contta
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
