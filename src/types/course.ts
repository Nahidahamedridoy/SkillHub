// ─── Nested Interfaces ─────────────────────────────────────────────────────────

export interface CourseInstructor {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  experienceYears?: number;
  totalStudents?: number;
  coursesCount?: number;
  avgRating?: number;
  socials?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface CurriculumLesson {
  title: string;
  duration: string;
  isPreviewable?: boolean;
}

export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  lessons: CurriculumLesson[];
}

export interface CourseReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

// ─── Core Course Interface ──────────────────────────────────────────────────────

export interface Course {
  // ── Listing / CourseCard fields ──
  id: string;
  title: string;
  instructor: string;        // display name string, used by CourseCard
  category: string;
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  badge?: string;
  lessonsCount: number;
  duration: string;
  /** Admin-controlled review status. Defaults to 'approved' for seeded data. */
  status?: "pending" | "approved" | "rejected";

  // ── Detail-view extended fields ──
  description?: string;                  // short one-liner for banner
  descriptionParagraphs?: string[];      // multi-paragraph for overview body
  studentsCount?: number;
  language?: string;
  lastUpdated?: string;
  level?: string;
  highlights?: string[];                 // learning outcomes / "what you'll learn"
  certificate?: boolean;
  instructorDetails?: CourseInstructor;  // rich instructor data for InstructorCard
  curriculum?: CurriculumModule[];       // module/lesson tree for CourseCurriculum
  reviews?: CourseReview[];              // student reviews for CourseReviews
}