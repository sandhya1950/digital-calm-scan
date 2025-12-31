import { AssessmentData, UserInfo } from '@/types/userInfo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const submitAssessment = async (data: AssessmentData): Promise<{ success: boolean; id?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit assessment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting assessment:', error);
    // Return success anyway for frontend-only mode
    return { success: true };
  }
};

export const getAssessments = async (): Promise<AssessmentData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assessments`);
    if (!response.ok) {
      throw new Error('Failed to fetch assessments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return [];
  }
};

// Weak area mapping for scoring engine
export const weakAreaMap: Record<string, string> = {
  q1: 'Notification Dependency',
  q2: 'Multitasking Habits',
  q3: 'Mindless Scrolling',
  q4: 'Mindless Scrolling',
  q5: 'Digital Procrastination',
  q6: 'Multitasking Habits',
  q7: 'Urgency & FOMO',
  q8: 'Mindless Scrolling',
  q9: 'Phone Anxiety',
  q10: 'Time Blindness',
  q11: 'Time Blindness',
  q12: 'Digital Procrastination'
};

export const identifyWeakAreas = (answers: Record<number, number>): string[] => {
  const weakAreas: string[] = [];
  Object.entries(answers).forEach(([questionId, value]) => {
    if (value >= 4) {
      const key = `q${questionId}`;
      const area = weakAreaMap[key];
      if (area && !weakAreas.includes(area)) {
        weakAreas.push(area);
      }
    }
  });
  return weakAreas;
};

export const calculateDistractionLevel = (totalScore: number): string => {
  if (totalScore >= 43) return 'High';
  if (totalScore >= 25) return 'Moderate';
  return 'Low';
};
