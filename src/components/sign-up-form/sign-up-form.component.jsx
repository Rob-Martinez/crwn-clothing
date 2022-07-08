import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useState } from "react";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handlerChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        }catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('email already in use')
            }else {
                console.log('user creation encountered an erro', error);
            }
        }
    }

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handlerChange} name="displayName" value={displayName}/>

                <label>Email</label>
                <input type="email" required onChange={handlerChange} name="email" value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handlerChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handlerChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm