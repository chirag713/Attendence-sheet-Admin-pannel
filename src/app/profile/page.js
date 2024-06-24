"use client";
import React, { useEffect, useState } from 'react';
import { Getuser } from '../services/userservice';
import styles from '../styles/userdetails.module.css';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import { gettodaytask } from '../services/taskservice';

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState([]);
    const [task, setTask] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resultUser = await Getuser();
                setUser(resultUser);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        const fetchTaskData = async () => {
            try {
                const resultTask = await gettodaytask();
                console.log(resultTask);
                setTask(resultTask);
            } catch (error) {
                console.log("Error fetching task data:", error);
            }
        };

        fetchUserData();
        fetchTaskData();

        const temp = localStorage.getItem("username");
        if (!temp) {
            router.push("/");
        }
    }, [router]);

    const saveDetail = (item) => {
        localStorage.setItem('username', JSON.stringify(item));
        router.push("/profileuser");
    };

    const checkIfTaskExists = (userId) => {
        return task.some(taskItem => taskItem.userId === userId);
    };

    const getItemColor = (item) => {
        return checkIfTaskExists(item._id) ? styles.orange : styles.red;
    };

    return (
        <div>
            <Header />
            <div className={styles.restaurantlistcontainer}>
                {user.map((item) => (
                    <div
                        key={item._id}
                        className={`${styles.restaurantwrapper} ${getItemColor(item)} hoverable-div`}
                        onClick={() => saveDetail(item)}
                    >
                        <div className={styles.addresswrapper}>
                            <h3>{item.name}</h3>
                            <div>Email: {item.email}</div>
                            <div className="address">Role: {item.role}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
