"use client";
import React, { useEffect, useState } from 'react'
import { Getuser } from '../services/userservice';

import styles from '../styles/userdetails.module.css';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

const page = () => {

    const router = useRouter();
    const [user, setuser] = useState([]);


    



    useEffect(() => {
        showuser();
        const temp=localStorage.getItem("username");
        if(!temp){
            router.push("/");
        }
    }, []);

    const showuser = async () => {
        try {
            let result = await Getuser();
            setuser(result);
        } catch (error) {
            console.log(error);
        }
    }

    const saveDetail = (item) => {
        console.log("hello");
        localStorage.setItem('username', JSON.stringify(item));
        router.push("/profileuser");
    }

    return (

        
        <div>

            <Header/>
            <div className={styles.restaurantlistcontainer}>
                {
                    user.map((item) => (
                        <div key={item._id} className={styles.restaurantwrapper} onClick={() => saveDetail(item)} >
                            <div className={styles.addresswrapper}>
                                <h3>{item.name}</h3>
                                <div>Email : {item.email}  </div>
                                <div className="address">Role : {item.role} </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
