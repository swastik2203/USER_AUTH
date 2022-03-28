import { Axios } from "axios";
import React, {useState} from 'react';


function Login() {


    const [usernameReg, setUernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState ('');


    const register = () => {
        Axios.post('http//localhost:3001/signup', {
        username: usernameReg,
        password: passwordReg,
        }).then((response)=>{
        console.log(response);
        })
  }



    return (
        <div class="login">
			<h1>Login</h1>
			<form action="/auth" method="post">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input 
                onChange={(e) => {
                setUernameReg(e.target.value);}}
                type="text" name="username" placeholder="Username" id="username" required></input>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input 
                onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }}
                type="password" name="password" placeholder="Password" id="password" required></input>
				<input onClick={register} type="submit" value="Login"></input>
			</form>
		</div>
    )
};

export default Login;
