import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import useStore from '../useStore';
import { useJwt, isExpired, decodeToken } from "react-jwt";
import useTokenStore from '../Stores/useTokenStore';
import useUserStore from '../Stores/useUserStore';


const LoginPage = () => {
    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const tokenFromStore = useTokenStore((state) => state.token)
    const setToken = useTokenStore((state) => state.setToken)

    const usernameFromStore = useUserStore((state) => state.username)
    const setUsernameFromStore = useUserStore((state) => state.setUsername)

    const handleRegister = async () => {
        try {
            const response = await axios.post("https://charming-cooperation-production.up.railway.app/register", {
               // const response = await axios.post("http://localhost:8080/register", {
                username, 
                password,
            });

            if (!response.status == 200) {
                throw new Error('Error!!! There was a problem with the response from the backend!');
            }

            const data = await response.data;
            console.log(data); // log response from backend

            // Extract token from response data
            const token = data.token;
            console.log("Token1:", token);

            console.log("initial token from store", tokenFromStore)
            setToken(token); // Update the token in the store
            console.log('Token from store after login:', useTokenStore.getState().token);
            //useStore.getState().setToken(token); // Update the token in the store
           
            // Access the token from the store and log it to the console
            /*
            console.log("Store1");
            console.log("Token from store1:", useStore.getState().getToken());
            console.log("here1");
            */

            // Decode the token using decodeToken function
            const decodedToken = decodeToken(token);
            console.log("Decoded token:", decodedToken);
            //useStore.getState().setToken(token); // Update the token in the store
            // Access the token from the store and log it to the console

            // Extract the username from the decoded token
            const usernameFromToken = decodedToken.sub;
            console.log("Username from token:", usernameFromToken);

            /*
            useStore.getState().setUsername(usernameFromToken); // Set the username
            console.log("Username from store:", useStore.getState().getUsername()); // Print the username to the console
            */

            console.log("initial username from store", usernameFromStore)
            setUsernameFromStore(usernameFromToken); // Update the username in the store
            console.log('Username from store after login:', useUserStore.getState().username); // Print the username fromm the store to the console

        axios.get(`https://charming-cooperation-production.up.railway.app/shoe/get/${usernameFromToken}`, {
               // axios.get(`http://localhost:8080/shoe/get/${usernameFromToken}`, {
    headers: {
        Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
    }
})
.then(response => {
    // Handle successful response here
    console.log('Response:', response.data);
})
.catch(error => {
    // Handle error here
    console.error('Error fetching data:', error);
});

           window.location.href = '/'; 
        } catch (error) {
            if (error.response != undefined && error.response.status === 409) { // check for a conflict http response
                alert("The username or email is already in used!!!"); // show an alert box in case of duplicated username or email
              }
            console.error('Error during register operation :', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://charming-cooperation-production.up.railway.app/login", {
            // const response = await axios.post("http://localhost:8080/login", {
            username,
            password,
            });

            console.log(response)

            if (!response.status == 200) {
                throw new Error('Error!!! There was a problem with the response from the backend!');
            }

            const data = await response.data;
            console.log(data); // log response from backend

            // Extract token from response data
            const token = data.token;
            console.log("Token1:", token);

            console.log("initial token from store", tokenFromStore)
            setToken(token); // Update the token in the store
            console.log('Token from store after login:', useTokenStore.getState().token);
            //useStore.getState().setToken(token); // Update the token in the store
           
            // Access the token from the store and log it to the console
            /*
            console.log("Store1");
            console.log("Token from store1:", useStore.getState().getToken());
            console.log("here1");
            */

            // Decode the token using decodeToken function
            const decodedToken = decodeToken(token);
            console.log("Decoded token:", decodedToken);
            //useStore.getState().setToken(token); // Update the token in the store
            // Access the token from the store and log it to the console

            // Extract the username from the decoded token
            const usernameFromToken = decodedToken.sub;
            console.log("Username from token:", usernameFromToken);

            /*
            useStore.getState().setUsername(usernameFromToken); // Set the username
            console.log("Username from store:", useStore.getState().getUsername()); // Print the username to the console
            */

            console.log("initial username from store", usernameFromStore)
            setUsernameFromStore(usernameFromToken); // Update the username in the store
            console.log('Username from store after login:', useUserStore.getState().username); // Print the username fromm the store to the console

            axios.get(`https://charming-cooperation-production.up.railway.app/shoe/get/${usernameFromToken}`, {
            //axios.get(`http://localhost:8080/shoe/get/${usernameFromToken}`, {
    headers: {
        Authorization: `Bearer ${tokenFromStore}` // Include token in the request headers
    }
})
.then(response => {
    // Handle successful response here
    console.log('Response:', response.data);
})
.catch(error => {
    // Handle error here
    console.error('Error fetching data:', error);
});

           window.location.href = '/'; 
            
        } catch (error) {
            if (error.response != undefined && error.response.status === 401) { 
                alert("The credentials you introduced are not valid!!!"); // show an alert box in case of an incorrect username/password
              }
            console.error('Error while logging in:', error);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text-container'>
                    <div className={`text ${action === 'Login' ? 'active' : 'inactive'}`} onClick={() => setAction("Login")}>Login</div>
                    <div className={`text ${action === 'Register' ? 'active' : 'inactive'}`} onClick={() => setAction("Register")}>Register</div>
                </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
    
                <div className='input'>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>


                <div className='input'>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

            </div>
            <div className='submit-container'>
                <div className={action === "Register" ? "submit-inactive" : "submit"}
                    onClick={handleLogin}>
                    Login
                </div>

                <div className={action === "Login" ? "submit-inactive" : "submit"}
                    onClick={handleRegister}>
                    Register
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
