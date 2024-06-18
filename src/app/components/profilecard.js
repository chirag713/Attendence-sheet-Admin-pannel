"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileCard.module.css'

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import avatar from "../img/avatar.jpg";

const ProfileCard = () => {


  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("username");
    if (userData) {
      try {
        userData = JSON.parse(userData);
        setUser(userData);
      } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <div className={styles.cardBorders}>
          <div className={styles.borderTop}></div>
          <div className={styles.borderRight}></div>
          <div className={styles.borderBottom}></div>
          <div className={styles.borderLeft}></div>
        </div>
        <div className={styles.cardContent}>
          <Image className={styles.avatar} alt="Avatar" src={avatar} style={
            {
              width: '50%',
              height: "200px"
            }
          }
          />
          <p className={styles.username}>{user?.name || "No user found"} </p>
          <p className={styles.designation}>{user?.role || "Add Your Role"}</p>
          <p className={styles.bio}>Joining Date: {user?.joiningdate || "Add your Joining date"}</p>
          <p className={styles.bio}>Unique ID: {user?._id}</p>
          <p className={`${styles.sheet} bg-red-800`}  onClick={()=>router.push("/showattendence")}>Show All Work</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
