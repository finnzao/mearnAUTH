import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	//Use state com controle do input do formulario
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	//Pegando os valores do input do formulario e colocando dentro do useState atraves do setData
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	
	//Mandando requisições para o backend
	const handleSubmit = async (e) => {
		//PREVENT DEFAULT: A tag form tem o comportamento de recarregar a pagina , e isso faz perder os dados armazenado no UseState

		e.preventDefault();
		try {
			//verifcação input
			const email=data.email
			const password=data.password
			const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
			if(!email | !password){
			  setError("Email e senha são necessários para login")
			  return;
			};

			if (!email.match(pattern)){
			  setError("Email invalido")
			  return
			}
			//enviando para backend
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			//RECEBIMENTO DO TOKEN 
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				//Pegando mensagem de error no backend e mostrando para o usuario
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Entre na sua conta</h1>
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
						Login
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>Ainda não tem conta ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Criar Conta
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
