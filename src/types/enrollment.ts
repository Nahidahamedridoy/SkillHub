// ─── Enrollment Types ─────────────────────────────────────────────────────────

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  category: string;
  duration: string;
  level?: string;
}

export interface Enrollment {
  id: string;
  enrolledAt: string; // ISO date string
  progress: number;   // 0–100
  course: EnrolledCourse | null;
}
