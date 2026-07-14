export type InstructorStatsItem = {
  title: string;
  value: string;
  subtitle: string;
  highlight: string;
};

export type InstructorCourse = {
  title: string;
  category: string;
  students: number;
  rating: number;
  earnings: string;
  status: string;
};

export type InstructorStudent = {
  name: string;
  course: string;
  progress: string;
  joined: string;
};

export type RevenueOverview = {
  total: string;
  monthlyChange: string;
  activeSubscriptions: number;
  projected: string;
};

export type ReviewItem = {
  student: string;
  course: string;
  rating: number;
  feedback: string;
  date: string;
};

export type InstructorActivity = {
  title: string;
  detail: string;
  timestamp: string;
};

export const instructorWelcome = {
  name: "Mia",
  message: "Drive student success with engaging content and real-time course insights.",
  badge: "Instructor",
  courses: 8,
  students: 5_230,
  revenue: "$24.1k",
  rating: "4.9",
};

export const instructorStats: InstructorStatsItem[] = [
  {
    title: "Total Courses",
    value: "8",
    subtitle: "Published live",
    highlight: "+2 this month",
  },
  {
    title: "Total Students",
    value: "5,230",
    subtitle: "Active learners",
    highlight: "+420 this month",
  },
  {
    title: "Revenue",
    value: "$24.1k",
    subtitle: "Last 30 days",
    highlight: "+18% growth",
  },
  {
    title: "Average Rating",
    value: "4.9",
    subtitle: "Across all courses",
    highlight: "Top 3%",
  },
];

export const myCourses: InstructorCourse[] = [
  {
    title: "Mastering Product Design",
    category: "Design",
    students: 820,
    rating: 4.9,
    earnings: "$7,800",
    status: "Live",
  },
  {
    title: "Advanced TypeScript Patterns",
    category: "Development",
    students: 1_350,
    rating: 4.8,
    earnings: "$9,300",
    status: "Live",
  },
  {
    title: "Growth Marketing Fundamentals",
    category: "Marketing",
    students: 620,
    rating: 4.7,
    earnings: "$5,400",
    status: "Live",
  },
];

export const recentStudents: InstructorStudent[] = [
  {
    name: "Jordan Rivera",
    course: "Advanced TypeScript Patterns",
    progress: "74%",
    joined: "2 days ago",
  },
  {
    name: "Priya Shah",
    course: "Mastering Product Design",
    progress: "62%",
    joined: "4 days ago",
  },
  {
    name: "Noah Chen",
    course: "Growth Marketing Fundamentals",
    progress: "89%",
    joined: "6 days ago",
  },
];

export const revenueOverview = {
  total: "$24,100",
  monthlyChange: "+18%",
  activeSubscriptions: 94,
  projected: "$32,400",
};

export const latestReviews: ReviewItem[] = [
  {
    student: "Ava Collins",
    course: "Mastering Product Design",
    rating: 5,
    feedback: "The workflow examples helped me launch a stronger brand.",
    date: "Today",
  },
  {
    student: "Sofia Martinez",
    course: "Advanced TypeScript Patterns",
    rating: 5,
    feedback: "Clear explanations and useful best practices.",
    date: "Yesterday",
  },
  {
    student: "Ethan Brooks",
    course: "Growth Marketing Fundamentals",
    rating: 4.9,
    feedback: "Excellent pacing and actionable strategy guidance.",
    date: "3 days ago",
  },
];

export const instructorActivity: InstructorActivity[] = [
  {
    title: "Published a new lesson",
    detail: "Added interactive quiz content to Product Design.",
    timestamp: "1h ago",
  },
  {
    title: "Responded to student feedback",
    detail: "Replied to questions in Advanced TypeScript Patterns.",
    timestamp: "Yesterday",
  },
  {
    title: "Updated course syllabus",
    detail: "Refined module order for Growth Marketing Fundamentals.",
    timestamp: "2 days ago",
  },
];
