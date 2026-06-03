

"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EnrollmentButton({ tutors }) {
    const { data: session } = useSession();

   const router = useRouter();

   
    const handleEnroll = async () => {
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            if (!token) {
                toast.error("You must be logged in to enroll in a tutor.");
                return;
            }
            
            const updatedData = {
                userId: session?.user?.id,
                studentName: session?.user?.name,
                courseTitle: tutors?.title,
                thumbnail: tutors?.thumbnail,
            };

            //  Fixed the template literal syntax here
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${tutors?._id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData)
            });

            // Added basic error checking before parsing
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server error (${res.status}): ${errorText}`);
            }

            const data = await res.json();
            console.log(data);
            toast.success("Successfully enrolled!");
            
        } catch (error) {
            console.error("Enrollment failed:", error);
            toast.error("Something went wrong with your enrollment.");
            return;
        }


        router.push("/my-tutors");
    };

    return (
        <Button
            size="lg"
            className="w-full mt-4 font-bold bg-gradient-to-r from-[#fbc7d4] to-[#cbb4d4] text-black"
            onPress={handleEnroll}
        >
            Enroll Now
        </Button>
    );
}