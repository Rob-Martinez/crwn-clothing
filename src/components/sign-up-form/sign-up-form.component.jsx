import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';




const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext)
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
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            setCurrentUser(user);
            
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
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handlerChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handlerChange} 
                    name="email" 
                    value={email}
                    />

                <FormInput 
                    label="Password" 
                    type="password" 
                    required
                    onChange={handlerChange} 
                    name="password" 
                    value={password}
                    />

                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handlerChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                    />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm