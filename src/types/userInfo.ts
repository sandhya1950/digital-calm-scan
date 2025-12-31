export interface UserInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  status: 'school' | 'undergraduate' | 'postgraduate' | 'working' | 'other';
}

export interface AssessmentData {
  userInfo: UserInfo;
  responses: {
    digitalDistraction: Record<string, number>;
    sleepImpact: Record<string, number> | null;
  };
  scores: {
    totalScore: number;
    distractionLevel: string;
  };
  weakAreas: string[];
}
