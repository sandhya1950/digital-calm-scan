import { Question } from "./questions";

export interface WeakAreaResource {
  type: 'youtube' | 'article';
  title: string;
  url: string;
}

export interface WeakAreaTool {
  name: string;
  url: string;
}

export interface WeakAreaData {
  key: Question['category'];
  title: string;
  icon: 'clock' | 'bell' | 'scroll' | 'brain' | 'alert-triangle' | 'timer';
  whyMatters: string;
  quickAction: string;
  resource: WeakAreaResource;
  tool: WeakAreaTool;
}

export const weakAreaDetails: WeakAreaData[] = [
  {
    key: 'time-management',
    title: 'Time Blindness',
    icon: 'clock',
    whyMatters: 'Losing track of time while on your phone reduces productivity and increases stress. It can leave you feeling like the day slipped away without accomplishing what matters most.',
    quickAction: 'Check your daily screen-time report each evening and set a realistic goal for tomorrow.',
    resource: {
      type: 'youtube',
      title: 'How to Stop Wasting Time on Your Phone',
      url: 'https://www.youtube.com/watch?v=NUMa0QkPzns'
    },
    tool: {
      name: 'RescueTime',
      url: 'https://www.rescuetime.com'
    }
  },
  {
    key: 'notifications',
    title: 'Notification Dependency',
    icon: 'bell',
    whyMatters: 'Frequent alerts interrupt your concentration and make it harder to enter deep focus. Each notification can take several minutes to fully recover from mentally.',
    quickAction: 'Disable non-essential app notifications right now. Keep only calls and messages from important contacts.',
    resource: {
      type: 'youtube',
      title: 'How Notifications Hijack Your Focus',
      url: 'https://www.youtube.com/watch?v=VpHyLG-sc4g'
    },
    tool: {
      name: 'Do Not Disturb Mode',
      url: 'https://support.google.com/android/answer/9069335'
    }
  },
  {
    key: 'scrolling',
    title: 'Mindless Scrolling',
    icon: 'scroll',
    whyMatters: 'Scrolling often becomes an automatic habit rather than a conscious choice. This passive consumption can leave you feeling drained without any real satisfaction.',
    quickAction: 'Before opening any social app, pause and ask yourself: "What am I looking for?" If you don\'t have an answer, don\'t open it.',
    resource: {
      type: 'youtube',
      title: 'How to Break the Scrolling Habit',
      url: 'https://www.youtube.com/watch?v=9z8_YhWoMao'
    },
    tool: {
      name: 'StayFocusd',
      url: 'https://chrome.google.com/webstore/detail/stayfocusd/laankejkbhbdhmipfmgcngdelahlfoji'
    }
  },
  {
    key: 'avoidance',
    title: 'Digital Procrastination',
    icon: 'brain',
    whyMatters: 'Using your phone to avoid difficult tasks provides temporary relief but increases long-term stress. The avoided task doesn\'t go away—it just gets harder to start.',
    quickAction: 'When you catch yourself reaching for your phone to avoid work, commit to just 5 minutes on the avoided task first.',
    resource: {
      type: 'article',
      title: 'Understanding Digital Procrastination',
      url: 'https://www.psychologytoday.com/us/basics/procrastination'
    },
    tool: {
      name: 'Pomodoro Timer',
      url: 'https://pomofocus.io'
    }
  },
  {
    key: 'anxiety',
    title: 'Urgency & FOMO',
    icon: 'alert-triangle',
    whyMatters: 'Feeling compelled to respond immediately creates constant low-level stress. This urgency is often artificial—most messages don\'t require instant replies.',
    quickAction: 'Practice delaying your responses by 30 minutes. Notice that the world doesn\'t end when you don\'t reply instantly.',
    resource: {
      type: 'youtube',
      title: 'Understanding FOMO and Digital Anxiety',
      url: 'https://www.youtube.com/watch?v=nqHmD8UNCk4'
    },
    tool: {
      name: 'Scheduled Do Not Disturb',
      url: 'https://support.apple.com/guide/iphone/turn-do-not-disturb-on-or-off-iph5c3f5b77b/ios'
    }
  },
  {
    key: 'multitasking',
    title: 'Multitasking Overload',
    icon: 'timer',
    whyMatters: 'Switching between apps and tabs fragments your attention. Research shows it takes an average of 23 minutes to fully refocus after an interruption.',
    quickAction: 'Close all tabs except the one you\'re actively using. Work on one task until it\'s complete before switching.',
    resource: {
      type: 'youtube',
      title: 'The Myth of Multitasking',
      url: 'https://www.youtube.com/watch?v=tMiOCDA1u-8'
    },
    tool: {
      name: 'Forest App',
      url: 'https://www.forestapp.cc'
    }
  }
];

export function getWeakAreaByCategory(category: Question['category']): WeakAreaData | undefined {
  return weakAreaDetails.find(area => area.key === category);
}
