"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
type StudentItem = {
  name: string;
  course: string;
  progress: string;
  joined: string;
};

type RecentStudentsProps = {
  students: StudentItem[];
};

export default function RecentStudents({ students }: RecentStudentsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <Text className="text-xl font-semibold text-slate-950">Recent Students</Text>
          <Text className="mt-2 text-sm text-slate-600">Monitor recent enrollments and student momentum.</Text>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {students.map((student) => (
            <div key={student.name} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Text className="text-base font-semibold text-slate-950">{student.name}</Text>
                  <Text className="mt-1 text-sm text-slate-600">{student.course}</Text>
                </div>
                <Badge className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Joined {student.joined}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>Progress</span>
                <span className="font-semibold text-slate-950">{student.progress}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
