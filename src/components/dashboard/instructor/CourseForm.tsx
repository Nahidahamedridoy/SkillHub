"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Card, CardContent, CardHeader, TextArea } from "@heroui/react";
import { Course } from "@/types/course";
import { CourseService } from "@/services/CourseService";
import { toast } from "react-hot-toast";
import { LuSave } from "react-icons/lu";

interface CourseFormProps {
  initialData?: Course;
  isEdit?: boolean;
}

export default function CourseForm({ initialData, isEdit = false }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<Partial<Course>>({
    defaultValues: initialData || {
      title: "",
      category: "",
      price: "",
      duration: "",
      imageUrl: "",
      description: "",
      lessonsCount: 0,
    },
  });

  const onSubmit = async (data: Partial<Course>) => {
    setLoading(true);
    try {
      // Data formatting
      const formattedData = {
        ...data,
        lessonsCount: Number(data.lessonsCount) || 0,
      };

      if (isEdit && initialData?.id) {
        await CourseService.updateCourse(initialData.id, formattedData);
        toast.success("Course updated successfully");
      } else {
        await CourseService.createCourse(formattedData);
        toast.success("Course created successfully");
      }
      router.push("/dashboard/instructor/courses");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? "Failed to update course" : "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <Card className="rounded-[24px]">

        <CardHeader className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEdit ? "Edit Course" : "Create New Course"}
          </h2>
        </CardHeader>

        <CardContent className="p-6 space-y-6">

          {/* Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Course Title
                  </label>

                  <Input
                    {...field}
                    id="title"
                    placeholder="e.g. Master React 19"
                  />

                  {errors.title && (
                    <p className="text-sm text-danger">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>

                  <Input
                    {...field}
                    id="category"
                    placeholder="e.g. Development"
                  />

                  {errors.category && (
                    <p className="text-sm text-danger">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          {/* Price Duration Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price
                  </label>

                  <Input
                    {...field}
                    id="price"
                    type="number"
                    placeholder="e.g. 99"
                  />

                  {errors.price && (
                    <p className="text-sm text-danger">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Duration
                  </label>

                  <Input
                    {...field}
                    id="duration"
                    placeholder="e.g. 42h 30m"
                  />

                  {errors.duration && (
                    <p className="text-sm text-danger">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="lessonsCount"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="lessonsCount" className="text-sm font-medium">
                    Lessons Count
                  </label>

                  <Input
                    {...field}
                    id="lessonsCount"
                    type="number"
                    placeholder="e.g. 15"
                  />
                </div>
              )}
            />
          </div>
          {/* Image URL */}
          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
            render={({ field }) => (
              <div className="space-y-2">

                <label htmlFor="imageUrl" className="text-sm font-medium">
                  Course Thumbnail URL
                </label>

                <Input
                  {...field}
                  id="imageUrl"
                  placeholder="https://images.unsplash.com/..."
                />

                {errors.imageUrl && (
                  <p className="text-sm text-danger">
                    {errors.imageUrl.message}
                  </p>
                )}

              </div>
            )}
          />
          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">

                <label
                  htmlFor="description"
                  className="text-sm font-medium"
                >
                  Short Description
                </label>

                <TextArea
                  {...field}
                  id="description"
                  aria-label="Course description"
                  className="h-32 w-full"
                  placeholder="Brief summary of what this course is about"
                />

                {errors.description && (
                  <p className="text-sm text-danger">
                    {errors.description.message}
                  </p>
                )}

              </div>
            )}
          />
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

            <Button
              variant="secondary"
              onPress={() => router.back()}
              isDisabled={loading}
            >
              Cancel
            </Button>


            <Button
              type="submit"
              variant="primary"
              isDisabled={loading}
            >
              {loading ? "Saving..." : (
                <span className="flex items-center gap-2">
                  <LuSave />
                  {isEdit ? "Update Course" : "Save Course"}
                </span>
              )}
            </Button>

          </div>

        </CardContent>
      </Card>
    </form>
  );
}
