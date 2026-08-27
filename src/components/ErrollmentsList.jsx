"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import CancelEnrollButton from "@/components/CancelEnrollButton";

export default function EnrollmentsList({ initialEnrollments, token }) {
    const [enrollments, setEnrollments] = useState(initialEnrollments);

    // Cancel করার সাথে সাথেই স্ক্রিন থেকে ঐ কার্ডটি সরিয়ে ফেলার জন্য
    const handleRemoveCard = (enrolmentId) => {
        setEnrollments((prev) => prev.filter((item) => item._id !== enrolmentId));
    };

    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="mb-4 text-slate-300 font-semibold text-lg">No enrolled courses found</p>
                <Link href="/courses">
                    <Button color="primary" className="font-bold">Browse Courses</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {enrollments.map((enrollment) => (
                <div
                    key={enrollment?._id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl items-center sm:items-start"
                >
                    <Image
                        src={enrollment?.thumbnail || "/default-course.png"}
                        alt={enrollment?.courseTitle || "Course"}
                        width={120}
                        height={90}
                        className="rounded-lg object-cover w-full sm:w-28 h-24"
                    />

                    <div className="flex flex-col grow justify-between w-full h-full">
                        <div>
                            <h3 className="font-bold text-lg text-white">{enrollment?.courseTitle}</h3>
                            <p className="text-sm text-slate-400">
                                Enrolled on: {enrollment?.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <Chip color="success" size="sm" variant="flat">
                                Active
                            </Chip>

                            <CancelEnrollButton
                                enrolmentId={enrollment?._id}
                                token={token}
                                onCancelSuccess={handleRemoveCard}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}