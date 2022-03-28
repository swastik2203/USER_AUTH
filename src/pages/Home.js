import {NavLink} from "react-router-dom";

// import '../App.css'
function Home() {
    return (
		<div className="homepage">

	    <h1>Hello user</h1>
		<label>New User??</label>
		<NavLink to='/signup'>
			<button>Signup</button>
		</NavLink>

        <br></br>
		<br></br>

		<label>Existing User??</label>
		<NavLink to='/login'>
			<button>Login</button>
		</NavLink>


		</div>
        

    )
};

export default Home;
