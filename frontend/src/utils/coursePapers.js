import { supabase } from './supabase';

export const iguCourseOptions = [
  { value: 'B.Tech', label: 'B.Tech (All Branches)' },
  { value: 'M.Tech', label: 'M.Tech (All Branches)' },
  { value: 'BCA', label: 'BCA (Bachelor of Computer Applications)' },
  { value: 'BBA', label: 'BBA (Bachelor of Business Administration)' },
  { value: 'B.Sc', label: 'B.Sc (All Branches)' },
  { value: 'M.Sc', label: 'M.Sc (All Branches)' },
  { value: 'BA', label: 'BA (Bachelor of Arts)' },
  { value: 'MA', label: 'MA (Master of Arts)' },
  { value: 'B.Com', label: 'B.Com (Bachelor of Commerce)' },
  { value: 'M.Com', label: 'M.Com (Master of Commerce)' },
];

export const semesterOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

export async function loadAdminPapers(courseName) {
  const { data, error } = await supabase
    .from('papers')
    .select('id, paper_id, paper_name, semester, google_drive_link, created_at')
    .eq('course_name', courseName)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Unable to load admin papers:', error.message);
    return [];
  }

  return (data || []).map((paper) => ({
    id: paper.paper_id || paper.id,
    name: paper.paper_name,
    sem: paper.semester,
    year: new Date(paper.created_at || Date.now()).getFullYear().toString(),
    link: paper.google_drive_link,
  }));
}