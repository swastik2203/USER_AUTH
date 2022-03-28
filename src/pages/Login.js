// import { Axios } from "axios";
import React, {useState} from 'react';


function Login() {


    // const history = useHistory();
    const [usernameReg, setUernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState ('');

    // const [submitted, setSubmitted] = useState(false);
    // const [error, setError] = useState(false);
    // const [samedataError, setSamedataError] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        
        const res = await fetch("/login", {
            method: "POST",
            headers:{
            "Content-Type" :"application/json"
            },
            body: JSON.stringify({
            username: usernameReg,
            password: passwordReg,
            })
        });
        const data = await res.json();
        
        if  (usernameReg === '' || passwordReg === '') {
            // setError(true);
            window.alert("invalid login");
            console.log("invalid login")
            }
        else if(res.status === 404 || !data){
            // setSamedataError(true);
            // setSubmitted(false);
            // setError(false);
            window.alert("invalid login");
            console.log("invalid login")
        } else{
            // setSubmitted(true);
            // setError(false);
            window.alert("succesful login")
            console.log("successful login")

            // history.push('/');

        }
    
    };


    // // Showing success message
    // const successMessage = () => {
    // return (
    // <div
    // className="success"
    // style={{
    // display: submitted ? '' : 'none',
    // }}>
    // <h1>User {usernameReg} successfully registered!!</h1>
    // </div>
    // );
    // };
    
    // Showing error message if error is true
    // const errorMessage = () => {
    // return (
    // <div
    // className="error"
    // style={{
    // display: error ? '' : 'none',
    // }}>
    // <h1>Please enter all the fields</h1>
    // </div>
    // );
    // };

    // // Showing samedataerror message if error is true
    // const samedataErrorMessage = () => {
    //     return (
    //     <div
    //     className="samedataerror"
    //     style={{
    //     display: samedataError ? '' : 'none',
    //     }}>
    //     <h1>User Already Exists  Please Enter Valid </h1>
    //     </div>
    //     );
    //     };



    return (
        <div class="login">
			<h1>Login</h1>
            {/* Calling to the methods
            <div className="messages">
            {errorMessage()}
            {successMessage()}
            {samedataErrorMessage()}
            </div> */}
			<form  method="post">
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
