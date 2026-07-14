export type ContinueLearningItem = {
  course: string;
  instructor: string;
  progress: number;
  lessonsLeft: number;
  duration: string;
};

export type CourseCardItem = {
  title: string;
  instructor: string;
  category: string;
  progress: number;
  updatedAt: string;
};

export type RecommendedCourseItem = {
  title: string;
  instructor: string;
  rating: number;
  students: number;
};

export type ProgressItem = {
  skill: string;
  completed: number;
  total: number;
};

export type ActivityItem = {
  title: string;
  type: string;
  timestamp: string;
  details: string;
};

export const welcomeData = {
  name: "Ava",
  message: "Continue building your skills with curated courses for your goals.",
  badge: "Student",
  points: 3_240,
  streak: 7,
};

export const statsData = [
  {
    title: "Courses Enrolled",
    value: "12",
    subtitle: "Active this month",
    highlight: "+2",
  },
  {
    title: "Completed Lessons",
    value: "48",
    subtitle: "Total progress",
    highlight: "+5 this week",
  },
  {
    title: "Current GPA",
    value: "3.9",
    subtitle: "Overall performance",
    highlight: "A- average",
  },
  {
    title: "Weekly Study",
    value: "16h",
    subtitle: "Time spent learning",
    highlight: "+4h",
  },
];

export const continueLearning: ContinueLearningItem[] = [
  {
    course: "User Experience Design",
    instructor: "Nina Brooks",
    progress: 64,
    lessonsLeft: 6,
    duration: "3.5h remaining",
  },
  {
    course: "Modern JavaScript",
    instructor: "Ethan Lee",
    progress: 42,
    lessonsLeft: 9,
    duration: "5h remaining",
  },
];

export const recentCourses: CourseCardItem[] = [
  {
    title: "Frontend Performance Optimization",
    instructor: "Maya Patel",
    category: "Web Development",
    progress: 84,
    updatedAt: "Updated 2 days ago",
  },
  {
    title: "Product Strategy Essentials",
    instructor: "Jordan Kim",
    category: "Business",
    progress: 52,
    updatedAt: "Updated 5 days ago",
  },
];

export const recommendedCourses: RecommendedCourseItem[] = [
  {
    title: "Design Systems for Teams",
    instructor: "Lisa Chen",
    rating: 4.8,
    students: 4200,
  },
  {
    title: "Advanced React Patterns",
    instructor: "Noah Carter",
    rating: 4.7,
    students: 3900,
  },
];

export const learningProgress: ProgressItem[] = [
  { skill: "Responsive Layouts", completed: 8, total: 10 },
  { skill: "Accessibility Audit", completed: 5, total: 7 },
  { skill: "Collaboration Workflows", completed: 3, total: 5 },
];

export const recentActivity: ActivityItem[] = [
  {
    title: "Completed module",
    type: "UX Fundamentals",
    timestamp: "1h ago",
    details: "Finished the layout design workshop.",
  },
  {
    title: "New assignment",
    type: "React Components",
    timestamp: "Yesterday",
    details: "Review the component library and submit notes.",
  },
  {
    title: "Course recommended",
    type: "AI in Product",
    timestamp: "2 days ago",
    details: "Based on your recent learning path.",
  },
];
