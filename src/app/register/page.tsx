'use client';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "customers", userCred.user.uid), {
        uid: userCred.user.uid,
        nama,
        email,
        nomor_telepon: nomor,
        createdAt: new Date(),
      });
      router.push("/dashboard");
    } catch (error) {
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4">
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={nomor} onChange={(e) => setNomor(e.target.value)} placeholder="Nomor Telepon" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
