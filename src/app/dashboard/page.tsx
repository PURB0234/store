'use client';
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      {/* <button onClick={() => signOut(auth)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button> */}
    </div>
  );
}
