"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingContact({ hidden }: { hidden?: boolean }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<any>({});
const pathname = usePathname();
    // ✅ Listen for CTA trigger from ChatWidget
    useEffect(() => {
        console.log("🚀 FloatingContact mounted");

        const handler = (e: any) => {
            console.log("🎯 EVENT RECEIVED", e.detail);
            setOpen(true);
        };

        window.addEventListener("open-contact-form", handler);

        return () => {
            window.removeEventListener("open-contact-form", handler);
        };
    }, []);

    const validate = (data: any) => {
        const newErrors: any = {};

        if (!data.name || data.name.trim().length < 2) {
            newErrors.name = "Please enter a valid name";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            newErrors.email = "Enter a valid email";
        }

        const phoneRegex = /^(?:\+?254|0)?[7][0-9]{8}$/;
        if (!data.phone || !phoneRegex.test(data.phone)) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (!data.service) {
            newErrors.service = "Please select a service";
        }

        if (!data.message || data.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        return newErrors;
    };

    return (
        <>
            {/* Floating Button */}
            {pathname === "/services" && (
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
            )}
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
                                    setErrors({});
                                }}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <X className="text-gray-700" size={20} />
                            </button>
                        </div>

                        {/* SUCCESS */}
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
                            <form
                                className="space-y-5"
                                onSubmit={async (e) => {
                                    e.preventDefault();

                                    const formData = new FormData(e.currentTarget);

                                    const payload = {
                                        name: formData.get("name"),
                                        email: formData.get("email"),
                                        phone: formData.get("phone"),
                                        service: formData.get("service"),
                                        message: formData.get("message"),
                                    };

                                    const validationErrors = validate(payload);
                                    setErrors(validationErrors);

                                    if (Object.keys(validationErrors).length > 0) return;

                                    setLoading(true);

                                    try {
                                        await fetch("/api/contact", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(payload),
                                        });

                                        const text = `Hello JM TekHub,%0A
Name: ${payload.name}%0A
Email: ${payload.email}%0A
Phone: ${payload.phone}%0A
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
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="0720000000"
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Service */}
                                <div>
                                    <select
                                        name="service"
                                        defaultValue=""
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>
                                        <option>Web Application Development</option>
                                        <option>Mobile App Development</option>
                                        <option>Desktop Application Development</option>
                                        <option>IT Consulting</option>
                                    </select>
                                    {errors.service && (
                                        <p className="text-red-500 text-xs">{errors.service}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us about your project..."
                                        className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-xs">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg text-white font-medium transition hover:opacity-90 disabled:opacity-60"
                                    style={{ background: "var(--primary-color)" }}
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