"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [success, setSuccess] = useState("");

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];

    return {
      strength,
      label: labels[strength],
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation (unchanged)
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength.strength < 2) {
      setError("Please use a stronger password");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(
        "Registration successful! Please check your email to verify your account."
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreeTerms(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-2 text-center">
                Create Your Account
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Join Cabike to buy and sell vehicles
              </p>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 w-6 rounded-full ${
                                passwordStrength.strength >= level
                                  ? level <= 1
                                    ? "bg-red-500"
                                    : level <= 2
                                    ? "bg-yellow-500"
                                    : level <= 3
                                    ? "bg-green-500"
                                    : "bg-green-600"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-xs ${
                            passwordStrength.strength <= 1
                              ? "text-red-600"
                              : passwordStrength.strength <= 2
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
