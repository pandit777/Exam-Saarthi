import { api } from './api';

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
  try {
    const { papers = [] } = await api.getPapers(courseName);

    return papers.map((paper) => ({
      id: paper.paper_id || paper.id,
      name: paper.paper_name,
      sem: paper.semester,
      year: String(paper.year || new Date(paper.created_at || Date.now()).getFullYear()),
      link: paper.google_drive_link,
    }));
  } catch (error) {
    return [];
  }
}