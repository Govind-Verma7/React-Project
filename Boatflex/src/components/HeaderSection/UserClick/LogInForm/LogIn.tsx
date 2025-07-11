import './LogIn.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import SignForm from '../SignInForm/SignForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { clearError, createLogInUser } from '../../../../features/userLogInSlice';

type LogInProps = {
  onClose: () => void;
};

const LogIn: React.FC<LogInProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [createAcc, setCreateAcc] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  type userLogInData = {
    client_id: string;
    client_secret: string;
    grant_type: string;
    username: string;
    password: string;
  }

  const [logInUser, setLogInUser] = useState<userLogInData>({
    client_id: 'boatflex',
    client_secret: 'e764cc97-28ae-4410-83d4-49ac4e388a76',
    grant_type: 'password',
    username: '',
    password: '',
  })
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, isAuthenticated } = useSelector((state: RootState) => state.logIn);

  function handleCreateAcc() {
    setCreateAcc(prevState => !prevState);
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };
  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
      return;
    } else {
      setEmailError('');
    }
    console.log(logInUser);
    dispatch(createLogInUser(logInUser))
  }
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);
  useEffect(() => {
    dispatch(clearError());
  }, []);
  return (
    <>
      {createAcc ? (
        <SignForm />
      ) : (
        <div className="boxParent">
          <div className="formContainer" ref={modalRef}>
            <div className="crossIcn" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} id="cross" />
            </div>

            <h2 id="logIn">Log in</h2>
            <p id="logBottom">Sign in to start cruising around an ocean of possibilities</p>
            <form className="logInForm" onSubmit={handleEmail}>
              {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  {typeof error === 'string'
                    ? error
                    : error?.error_description || 'Login failed.'}
                </div>)}
              <label htmlFor="email" id="emailTxt" className="labelTxt">Email</label><br />
              <input type="email" id="email" className="inpField" name='Email' value={logInUser.username} onChange={(e) => {
                setLogInUser(prev => ({
                  ...prev,
                  username: e.target.value
                }))
                setEmail(e.target.value);
                setEmailError('');
                if (error) dispatch({ type: 'userLogInDetail/clearError' });
              }} required />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}<br />
              <label htmlFor="pass" className="labelTxt">Password</label><br />
              <input type='password' id="pass" name='Password' className="inpField" value={logInUser.password} onChange={(e) => setLogInUser(prev => ({
                ...prev,
                password: e.target.value
              }))} required />
              <br />
              <a href="#" id="forgotPassTxt" className="anchorTxt">Forgot Password?</a><br /><br />
              <a href="#" id="createAccTxt" className="anchorTxt" onClick={handleCreateAcc}>Create account</a><br /><br />
              <input type="submit" value="Continue" id="conBtn" />
              {loading ? 'Logging in...' : 'Login'}
            </form>

            <div className="partition">
              <hr />
              <p id="orUseTxt">Or use</p>
              <hr />
            </div>
            <button type="button" id="facebookBtn" className="brandBtn">
              <FontAwesomeIcon icon={faFacebook} className="brandIcn" /> Facebook
            </button><br /><br />
            <button type="button" id="googleBtn" className="brandBtn">
              <FontAwesomeIcon icon={faGoogle} className="brandIcn" /> Google
            </button>
            <button type="button" id="appleBtn" className="brandBtn">
              <FontAwesomeIcon icon={faApple} className="brandIcn" /> Apple
            </button>
          </div>
        </div>
      )}
    </>
  );

};

export default LogIn;
