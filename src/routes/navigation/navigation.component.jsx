import { Fragment, useContext} from "react";
import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss';
import { ReactComponent  as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";


const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log(currentUser);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
        
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo"/>
                </Link>
            
                <div className="nav-links-container">                
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>Sign Out</span>
                        )   : (
                        <Link className="nav-link" to='/auth'>
                            Sign-In
                        </Link>
                    )}
                    
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation 