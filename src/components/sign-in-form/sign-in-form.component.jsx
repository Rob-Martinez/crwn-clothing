import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword  } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';



const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handlerChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }catch(error) {
           
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Google Sign-in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm