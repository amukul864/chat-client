"use client";

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./forminput.module.css";
import AuthContext from "@/app/store/auth-context";
import UserContext from "@/app/store/user-context";
import ErrorContext from "@/app/store/error-context";
import ErrorModal from "../ErrorModal";
import Image from "next/image";

const Forminput = () => {
  const authCtx = useContext(AuthContext);
  const errorCtx = useContext(ErrorContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const userCtx = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [changed, setChanged] = useState<boolean | null>(null);

  useEffect(() => {
    if (authCtx.userinfo && (changed === true || changed === null)) {
      if (usernameRef.current) {
        usernameRef.current.value = authCtx.userinfo.username;
      }
      if (firstNameRef.current) {
        firstNameRef.current.value = authCtx.userinfo.name.split(" ")[0];
      }
      if (lastNameRef.current) {
        lastNameRef.current.value = authCtx.userinfo.name.split(" ")[1] || "";
      }
      if (emailRef.current) {
        emailRef.current.value = authCtx.userinfo.email || "";
      }
      if (photoRef.current) {
        photoRef.current.value = authCtx.userinfo.photo || "";
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
      setTwoFactor(authCtx.userinfo.isTwoFactor);
      setChanged(null);
    }
  }, [authCtx.userinfo, changed]);

  const clickHandler = async () => {
    setChanged(null);
    setLoading(true);
    const isChanged = await userCtx.changeUserInfo({
      username:
        usernameRef.current?.value.trim() !== authCtx.userinfo?.username
          ? usernameRef.current?.value.trim()
          : undefined,
      name:
        firstNameRef.current?.value.trim() +
          " " +
          lastNameRef.current?.value.trim() !==
        authCtx.userinfo?.name
          ? firstNameRef.current?.value.trim() +
            " " +
            lastNameRef.current?.value.trim()
          : undefined,
      email:
        emailRef.current?.value.trim() !== authCtx.userinfo?.email
          ? emailRef.current?.value.trim()
          : undefined,
      password:
        passwordRef.current?.value.trim() !== ""
          ? passwordRef.current?.value.trim()
          : undefined,
      photo:
        photoRef.current?.value.trim() !== authCtx.userinfo?.photo
          ? photoRef.current?.value.trim()
          : undefined,
      isTwoFactor:
        twoFactor !== authCtx.userinfo?.isTwoFactor ? twoFactor : undefined,
    });
    setChanged(isChanged);
    if (isChanged === true) {
      errorCtx.seterror(["User Info Changed."]);
    }
    setLoading(false);
  };

  const usernameHandler = async () => {
    const username = usernameRef.current!.value.trim();
    if (username.length < 1) {
      errorCtx.seterror(["Please Enter Username"]);
      return;
    }
    const isAvailable = await userCtx.isUsernameAvailable(username);
    setText(isAvailable ? "Username Is Available" : "Username Not Avalalable");
  };

  const twoFactorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTwoFactor(event.target.checked);
  };

  return (
    <React.Fragment>
      {errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
      <div className={styles.horizontal2}>
        <input
          className={styles.input2}
          type="text"
          placeholder="First Name"
          ref={firstNameRef}
        />
        <input
          className={styles.input2}
          type="text"
          placeholder="Last Name"
          ref={lastNameRef}
        />
      </div>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
        ref={usernameRef}
      />
      <button onClick={usernameHandler} className={styles.button}>
        Check username
      </button>
      {text !== "" && <div className={styles.text}>{text}</div>}
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        ref={passRef}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Photo"
        ref={photoRef}
      />
      <div className={styles.flex}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={twoFactorHandler}
          checked={authCtx.userinfo?.isTwoFactor}
        />
        <div className={styles.text}>Enable Two Factor Verification</div>
      </div>
      <button onClick={authCtx.onLogout} className={styles.button}>
        Logout
      </button>
      {loading ? (
        <Image
          className={styles.image}
          src="/loading.svg"
          alt="logo"
          width={40}
          height={40}
        />
      ) : (
        <button className={styles.logbutton} onClick={clickHandler}>
          Change User Info
        </button>
      )}
    </React.Fragment>
  );
};

export default Forminput;
