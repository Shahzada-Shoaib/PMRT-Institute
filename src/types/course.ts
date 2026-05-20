export type ContentType = 'video' | 'material';

export type MaterialFormat = 'image' | 'pdf';

export type CourseContentItem = {
  id: string;
  title: string;
  type: ContentType;
  duration?: string;
  description: string;
  videoUrl?: string;
  materialUrl?: string;
  materialFormat?: MaterialFormat;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  duration: string;
  lessonCount: number;
  level: string;
  objectives: string[];
  content: CourseContentItem[];
};
