

"use client";

import React, { useState } from 'react';
import styles from '../styles/SignForm.module.css';
import { toast } from 'react-toastify';
import { Loginuser, Signupuser } from '../services/userservice';
import { useRouter } from 'next/navigation';




const SignupForm = () => {

    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);


    const [signindata, setsigninData] = useState({
        email: "",
        name: "",
        password: "",
    });

    const [confirmpassword, setconfirmPassword] = useState("");



    const submitsignindata = async (e) => {
        e.preventDefault();
        if (signindata.name === "" || signindata.name === null) {
            toast.warning("Name field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (signindata.email === "" || signindata.email === null) {
            toast.warning("Email field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (signindata.password === "" || signindata.password === null) {
            toast.warning("Password field is required !!..", {
                position: "top-center"
            });
            return;
        }

        if (signindata.password != confirmpassword) {
            toast.warning("Password not matched !!..", {
                position: "top-center"
            });
            return;
        }


        try {
            const result = await Signupuser(signindata);
            toast.success("User created successfully !!..", {
                position: "top-center"
            });
            delete result.password;
            localStorage.setItem('username', JSON.stringify(result));
            router.push("/profile");
        } catch (error) {
            toast.error("Something went wrong !!..", {
                position: "top-center"
            });
        }
    }

    return (
        <div className={`m-2 ${styles.wrapper} ${isSignUp ? styles.animateSignUp : styles.animateSignIn}`} >
            <div className={`${styles.formWrapper} ${styles.signUp}  `} >
                <form >
                    <h2>Sign Up</h2>
                    <div className={styles.inputGroup}>
                        <input type="text" required

                            onChange={(event) => {
                                setsigninData({
                                    ...signindata,
                                    name: event.target.value,
                                })
                            }}
                            value={signindata.name}

                        />
                        <label>Username</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="email" required
                            onChange={(event) => {
                                setsigninData({
                                    ...signindata,
                                    email: event.target.value,
                                })
                            }}
                            value={signindata.email}

                        />
                        <label>Email</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" required

                            onChange={(event) => {
                                setsigninData({
                                    ...signindata,
                                    password: event.target.value,
                                })
                            }}
                            value={signindata.password}

                        />
                        <label>Password</label>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" required

                            onChange={(event) => {
                                setconfirmPassword(event.target.value)
                            }}
                            value={confirmpassword}
                        />
                        <label>Confirm Password</label>
                    </div>
                    <button onClick={submitsignindata} className={styles.btn}>Sign Up</button>
                    <div className={styles.signLink}>
                        <br />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
