import axios from 'axios'

class authService{
    async register(registerData, callback) {
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', registerData);

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
    
    async signIn(loginData,callback){
        // make a call to our login api endpoint

        try{
            const response= await axios.post(`http://localhost:3000/api/users/login`, loginData,{withCredentials: true})
            // if(response.status === 200){
            //     navigate('/')
            // } else{
            //     console.log('invalid login')
            // }
            switch (response.status){
                case 200:{
                    callback(true)
                    break;
                }
                case 401:{
                    callback(false)
                    break;
                }
                case 500:{
                    callback(false)
                    break;
                }
            }
        }
        catch(err){
            console.log(`An unexpected error occured`)
        }
    }

    async signOut(callback){
        // delete token from cookiess
        try{
            const response = await axios.post(`http://localhost:3000/api/users/logout`)
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