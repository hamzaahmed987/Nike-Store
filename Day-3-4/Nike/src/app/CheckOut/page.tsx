"use client";
import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";

export default function CheckOut() {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pan: "",
        address: "",
    });
    const [orderId, setOrderId] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.pan || !formData.address) {
            showAlert("Please fill in all the required fields.");
            return;
        }

        if (cart.length === 0) {
            showAlert("Your cart is empty. Please add items to your cart.");
            return;
        }

        const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
        setOrderId(generatedOrderId);
        setShowDialog(true);

        sessionStorage.setItem(
            "orderDetails",
            JSON.stringify({ formData, cart, orderId: generatedOrderId })
        );

        const emailContent = {
            firstName: formData.firstName || "N/A",
            lastName: formData.lastName || "N/A",
            email: formData.email || "N/A",
            phone: formData.phone || "N/A",
            pan: formData.pan || "N/A",
            address: formData.address || "N/A",
            orderId: generatedOrderId || "N/A",
            cart: cart.map(item => `${item.name} (Qty: ${item.quantity})`).join(", ") || "No items in cart",
        };

        console.log("Email Content:", emailContent);

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailContent),
            });

            if (response.ok) {
                showAlert("Order confirmation sent to your email!");
            } else {
                showAlert("Failed to send confirmation email.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            showAlert("Failed to send confirmation email.");
        }
    };

    const handleTrackOrder = () => {
        router.push(`/Order-Tracking/${orderId}`);
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-6">
            {alertMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
                    {alertMessage}
                </div>
            )}
            <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto gap-8">
                <div className="bg-white w-full lg:w-[440px] p-6">
                    <h1 className="text-[21px] font-medium mb-4">How would you like to get your order?</h1>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <input type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <input type="text" placeholder="PAN" name="pan" value={formData.pan} onChange={handleInputChange} className="p-4 border rounded-md w-full" />
                        <button className="w-full p-4 bg-[#111111] text-white rounded-3xl">Continue</button>
                    </form>
                </div>
                <div className="bg-white w-full lg:w-[320px] p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <ul className="space-y-6">
                        {cart.map((item) => (
                            <li key={item.id} className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-[128px] h-[128px] rounded-md border mr-4" />
                                <div>
                                    <p className="font-normal text-[13px]">{item.name}</p>
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showDialog && orderId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-[400px]">
                        <h2 className="text-lg font-medium mb-4">Your Order ID: {orderId}</h2>
                        <p className="mb-4">We have received your order! A confirmation email has been sent to {formData.email}.</p>
                        <button onClick={handleTrackOrder} className="w-full p-4 bg-[#111111] text-white rounded-3xl">Track Order</button>
                    </div>
                </div>
            )}
        </div>
    );
}