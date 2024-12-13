import axios from 'axios'

class authService{
    async register(registerData, callback) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register', registerData`);

            if (response.status === 200) {
                // Registration successful, return success to the callback
                callback(true);
            } else {
                // Something went wrong with the registration, return failure
                callback(false);
            }
        } catch (err) {
            console.error('Registration error:', err);
            callback(false);  // Pass false if there's an error
        }
    }
    
    async signIn(loginData, callback) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                loginData,
                { withCredentials: true }
            );
    
            console.log('Login response:', response);  // Log the entire response
    
            // Check if response.data contains the message and handle accordingly
            if (response.data.message === 'Login successful') {
                // Normally, you'd get user data here, but since we don't have that,
                // we'll just assume the login is successful and continue
                const email = loginData.email;  // Use the email from the login data
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);  // Store the email in sessionStorage
                //console.log('User logged in with email:', email);
                callback(true);  // Successful login
            } else {
                console.log('Login failed: ' + response.data.message);
                callback(false);  // Login failed
            }
        } catch (err) {
            console.log('An unexpected error occurred', err);
            callback(false);  // Login failed due to error
        }
    }
    
    async signOut(callback){
        // delete token from cookiess
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`)
            if(response.status=== 204){
                sessionStorage.removeItem('isLoggedIn')
                callback(true)
            }else{
                callback(false)
            }
        }
        catch(err){
            console.log(`An unexpcted error occured.`)
        }
    }

    isSignedIn(){
        // check for existence of token in cookies
        return !!sessionStorage.getItem('isLoggedIn')
    }
}

export default new authService()