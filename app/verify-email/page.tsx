"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }
    fetch(`/api/verify-email?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          setMessage(data.error);
        } else {
          setStatus("success");
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="text-4xl animate-pulse">💅</div>
            <p className="text-gray-600">Verifying your email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl">✅</div>
            <h2 className="text-2xl font-bold text-gray-800">Email Verified!</h2>
            <p className="text-gray-600">{message}</p>
            <Link href="/login?verified=true" className="inline-block mt-4 bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
              Go to Login
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl">❌</div>
            <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
            <p className="text-gray-600">{message}</p>
            <Link href="/register" className="inline-block mt-4 bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
              Back to Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
