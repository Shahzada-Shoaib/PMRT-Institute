import { courses } from '@/data/mock/courses';
import type { Course } from '@/types/course';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCourses(): Promise<Course[]> {
  await delay();
  return courses;
}

export async function getCourseById(id: string): Promise<Course | null> {
  await delay();
  return courses.find((course) => course.id === id) ?? null;
}
