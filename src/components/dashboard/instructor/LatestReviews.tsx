"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
import { LuStar } from "react-icons/lu";

export type ReviewItem = {
  student: string;
  course: string;
  rating: number;
  feedback: string;
  date: string;
};

type LatestReviewsProps = {
  reviews: ReviewItem[];
};

export default function LatestReviews({ reviews }: LatestReviewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Text className="text-xl font-semibold text-slate-950">Latest Reviews</Text>
            <Badge className="rounded-full bg-amber-100 px-4 py-2 text-sm text-amber-700">Recent</Badge>
          </div>
          <Text className="mt-2 text-sm text-slate-600">Student feedback from your most recent course sessions.</Text>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {reviews.map((review) => (
            <div key={`${review.student}-${review.date}`} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Text className="font-semibold text-slate-950">{review.student}</Text>
                  <Text className="text-sm text-slate-600">{review.course}</Text>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-700 border border-amber-100">
                  <LuStar size={14} />
                  {review.rating.toFixed(1)}
                </div>
              </div>
              <Text className="mt-3 text-sm text-slate-600">{review.feedback}</Text>
              <Text className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{review.date}</Text>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
