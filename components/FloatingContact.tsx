"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingContact() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white shadow-xl transition hover:scale-105"
                style={{
                    background: "var(--primary-color)",
                    boxShadow: "0 10px 30px rgba(1, 0, 102, 0.5)",
                }}
            >
                <MessageCircle size={20} />
                <span className="text-sm font-medium">Talk to us</span>
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="w-full md:w-[420px] bg-white rounded-t-2xl md:rounded-2xl p-6 animate-slideUp shadow-2xl">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <MessageCircle size={22} style={{ color: "var(--primary-color)" }} />
                                <h2 className="text-lg font-semibold text-[var(--primary-color)]">
                                    Talk to us
                                </h2>
                            </div>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setSuccess(false);
                                }}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <X className="text-gray-700" size={20} />
                            </button>
                        </div>

                        {/* SUCCESS STATE */}
                        {success ? (
                            <div className="text-center py-10">
                                <h3 className="text-lg font-semibold text-green-600">
                                    Request Sent ✓
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    We'll contact you shortly.
                                </p>
                            </div>
                        ) : (
                            /* Form */
                            <form
                                className="space-y-5"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setLoading(true);

                                    const formData = new FormData(e.currentTarget);

                                    const payload = {
                                        name: formData.get("name"),
                                        email: formData.get("email"),
                                        service: formData.get("service"),
                                        message: formData.get("message"),
                                    };

                                    try {
                                        // Send email
                                        await fetch("/api/contact", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(payload),
                                        });

                                        // WhatsApp redirect
                                        const text = `Hello JM TekHub,%0A
Name: ${payload.name}%0A
Email: ${payload.email}%0A
Service: ${payload.service}%0A
Message: ${payload.message}`;

                                        window.open(
                                            "https://wa.me/254720294569?text=" + text,
                                            "_blank"
                                        );

                                        setSuccess(true);
                                    } catch (err) {
                                        console.error(err);
                                        alert("Something went wrong");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            >

                                {/* Name */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:shadow-md transition"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:shadow-md transition"
                                    />
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Service Needed
                                    </label>
                                    <select
                                        name="service"
                                        required
                                        defaultValue=""
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:shadow-md transition"
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>
                                        <option>Web Application Development</option>
                                        <option>Mobile App Development</option>
                                        <option>Desktop Application Development</option>
                                        <option>IT Consulting</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Project Details
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        placeholder="Tell us about your project..."
                                        rows={4}
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:shadow-md transition"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg text-white font-medium transition hover:opacity-90 disabled:opacity-60"
                                    style={{
                                        background: "var(--primary-color)",
                                    }}
                                >
                                    {loading ? "Sending..." : "Send Request"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}