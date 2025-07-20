'use client';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={handle} className="max-w-md mx-auto mt-16 flex flex-col gap-4">
      <h1 className="text-2xl">Login</h1>
      {err && <p className="text-red-500">{err}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" required/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2" required/>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
      <Link className="text-black" href="/register">Register</Link>
    </form>
  );
}
