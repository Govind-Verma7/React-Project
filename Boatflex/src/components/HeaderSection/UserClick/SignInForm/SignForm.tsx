import './Signform.css';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { clearError, createUser } from '../../../../features/userDetailSlice';

const SignForm = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [showForm, setShowForm] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    type UserFormData = {
        Email: string,
        Password: string,
        agreeForPrivacyPolicy: boolean,
        agreeForMarketingPermissions: boolean,
        firstName: string,
        lastName: string,
        CountryCode: string,
        PhoneNumber: string,
        referralUserId: number,
    };

    const [users, setUsers] = useState<UserFormData>({
        Email: '',
        Password: '',
        agreeForPrivacyPolicy: true,
        agreeForMarketingPermissions: false,
        firstName: '',
        lastName: '',
        CountryCode: '+91',
        PhoneNumber: '',
        referralUserId: 0,
    });

    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, isSignInUser } = useSelector((state: RootState) => state.signUp);

    const getUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUsers((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const validateEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };

    const validatePassword = (password: string) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return pattern.test(password);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;

        if (!validateEmail(users.Email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
            return;
        } else {
            setEmailError('');
        }

        if (!/^\d{10}$/.test(users.PhoneNumber)) {
            setPhoneError('Phone number must be exactly 10 digits.');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!validatePassword(users.Password)) {
            setPasswordError('Password must be at least 8 characters, include lowercase, uppercase, number, and special character.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (users.Password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (users.firstName.trim().length < 3) {
            setFirstNameError('First name must be at least 3 characters.');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!isValid) return;

        console.log(users);
        dispatch(createUser(users));
    };
    useEffect(() => {
        if (isSignInUser) {
            setShowForm(false);
        }
    }, [isSignInUser]);
    useEffect(() => {
        dispatch(clearError());
    }, [])
    return (
        <>
            {showForm && (
                <div className="parentSignIn">
                    <div className='signContainer' ref={modalRef}>
                        <div className="crossSign" onClick={handleCloseForm}>
                            <FontAwesomeIcon icon={faXmark} id="crossI" />
                        </div>
                        <h2 id="finishTxt">Finish your profile</h2>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div style={{ color: 'red', marginBottom: '10px' }}>
                                    {typeof error === 'string'
                                        ? error
                                        : error?.error_description || 'SignUp failed.'}
                                </div>)}
                            <span className='nameSpan'>
                                <div className="fNameDiv">
                                    <label htmlFor="fName" className='nameLabel'>First name</label> <br />
                                    <input
                                        type="text"
                                        id='fName'
                                        placeholder='Your first name'
                                        className='formInp'
                                        value={users.firstName}
                                        name='firstName'
                                        onChange={(e) => {
                                            setFirstNameError('');
                                            getUserData(e);
                                        }}
                                        required
                                    />
                                    {firstNameError && <p style={{ color: 'red' }}>{firstNameError}</p>}
                                </div>
                                <div className="lNameDiv">
                                    <label htmlFor="lName" className='nameLabel'>Last name</label> <br />
                                    <input
                                        type="text"
                                        id='lName'
                                        placeholder='Your last name'
                                        className='formInp'
                                        value={users.lastName}
                                        name='lastName'
                                        onChange={getUserData}
                                    />
                                </div>
                            </span>

                            <label htmlFor="email" className='nameLabel'>Email</label> <br />
                            <input
                                type="email"
                                id='email'
                                placeholder='Your Email'
                                className='formInp formNum'
                                value={users.Email}
                                name='Email'
                                onChange={(e) => {
                                    setEmailError('');
                                    getUserData(e);
                                }}
                                required
                            />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            <br />

                            <label htmlFor="pNo" className='nameLabel'>Phone number</label> <br />
                            <input
                                type="text"
                                id="pNo"
                                placeholder="9988776655"
                                className="formInp formNum"
                                value={users.PhoneNumber}
                                name='PhoneNumber'
                                onChange={(e) => {
                                    setPhoneError('');
                                    getUserData(e);
                                }}
                                required
                            />
                            {phoneError && <p style={{ color: 'red', marginTop: '4px' }}>{phoneError}</p>}

                            <label htmlFor="pass" className='nameLabel'>Password</label> <br />
                            <input
                                type="password"
                                id='pass'
                                className='formInp formNum'
                                value={users.Password}
                                name='Password'
                                onChange={(e) => {
                                    setPasswordError('');
                                    getUserData(e);
                                }}
                                required
                            />
                            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} <br />

                            <label htmlFor="rPass" className='nameLabel'>Repeat password</label> <br />
                            <input
                                type="password"
                                id='rPass'
                                className='formInp formNum'
                                value={confirmPassword}
                                name='rpass'
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError('');
                                }}
                                required
                            />
                            {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>} <br />

                            <div className="agreement">
                                <input type="checkbox" required className='agreeCheck' name='agreeForPrivacyPolicy' onChange={getUserData} />
                                <span id='agreementOne'>Agreement of our <a href="#">Privacy Policy</a> and our <a href="#">Terms of Service</a></span>
                            </div>
                            <div className="agreement">
                                <input type="checkbox" className='agreeCheck' name='agreeForMarketingPermissions' onChange={getUserData} />
                                <span id='agreementTwo'>Agreement of our <a href="#">Marketing permissions</a></span>
                            </div>
                            <input type="submit" id='contBtn' value="Continue" />
                            {loading ? 'Signing up...' : 'SignUp'}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignForm;
