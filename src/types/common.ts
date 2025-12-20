// Shared types used across the application

export interface ClassDetails {
  class_name?: string
  child_name?: string
  class_date?: string
  start_time?: string
  end_time?: string
}

export interface PageProps {
  childName?: string
  classDetails?: ClassDetails
  code?: string
}

export type ClassType = 'gita' | 'maths' | 'english' | null

