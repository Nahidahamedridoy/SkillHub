"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input,  Button, Card, CardContent, CardHeader, TextArea } from "@heroui/react";
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Course Title"
                  placeholder="e.g. Master React 19"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Category"
                  placeholder="e.g. Development"
                  isInvalid={!!errors.category}
                  errorMessage={errors.category?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Price"
                  placeholder="e.g. $94.99"
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                />
              )}
            />
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Duration"
                  placeholder="e.g. 42h 30m"
                  isInvalid={!!errors.duration}
                  errorMessage={errors.duration?.message}
                />
              )}
            />
            <Controller
              name="lessonsCount"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Lessons Count"
                  placeholder="e.g. 15"
                />
              )}
            />
          </div>

          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="Course Thumbnail URL"
                placeholder="https://images.unsplash.com/..."
                isInvalid={!!errors.imageUrl}
                errorMessage={errors.imageUrl?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Short Description"
                placeholder="Brief summary of what this course is about"
                minRows={3}
              />
            )}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="flat"
              onPress={() => router.back()}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              startContent={!loading && <LuSave />}
            >
              {isEdit ? "Update Course" : "Save Course"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
