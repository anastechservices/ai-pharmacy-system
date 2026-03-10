export interface Festival {
  id: string;
  nameEn: string;
  nameUr: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  emoji: string;
  descEn: string;
  descUr: string;
  greetingEn: string;
  greetingUr: string;
  themeFrom: string;
  themeTo: string;
  priority: number;
}

const festivals: Festival[] = [
  {
    id: "new-year",
    nameEn: "New Year",
    nameUr: "Naya Saal Mubarak",
    startMonth: 1, startDay: 1, endMonth: 1, endDay: 2,
    emoji: "🎉",
    descEn: "Start your new year with the smartest pharmacy system!",
    descUr: "Naye saal ki shuruat smartest pharmacy system ke saath karein!",
    greetingEn: "Happy New Year!",
    greetingUr: "Naya Saal Mubarak!",
    themeFrom: "from-yellow-500", themeTo: "to-orange-600",
    priority: 80,
  },
  {
    id: "shab-e-meraj",
    nameEn: "Shab-e-Meraj",
    nameUr: "Shab-e-Meraj Mubarak",
    startMonth: 1, startDay: 17, endMonth: 1, endDay: 18,
    emoji: "✨",
    descEn: "A blessed night calls for blessed decisions — upgrade today!",
    descUr: "Mubarak raat, mubarak faisla — aaj hi upgrade karein!",
    greetingEn: "Shab-e-Meraj Mubarak!",
    greetingUr: "Shab-e-Meraj Mubarak!",
    themeFrom: "from-blue-600", themeTo: "to-indigo-700",
    priority: 85,
  },
  {
    id: "shab-e-barat",
    nameEn: "Shab-e-Barat",
    nameUr: "Shab-e-Barat Mubarak",
    startMonth: 2, startDay: 1, endMonth: 2, endDay: 2,
    emoji: "🌙",
    descEn: "Blessed night, blessed savings on your pharmacy system!",
    descUr: "Mubarak raat, pharmacy system pe mubarak bachat!",
    greetingEn: "Shab-e-Barat Mubarak!",
    greetingUr: "Shab-e-Barat Mubarak!",
    themeFrom: "from-indigo-600", themeTo: "to-purple-700",
    priority: 85,
  },
  {
    id: "kashmir-day",
    nameEn: "Kashmir Solidarity Day",
    nameUr: "Youm-e-Yakjehti Kashmir",
    startMonth: 2, startDay: 5, endMonth: 2, endDay: 5,
    emoji: "🤝",
    descEn: "Stand united — upgrade your pharmacy this Kashmir Day!",
    descUr: "Mutahid rahein — Kashmir Day pe apni pharmacy upgrade karein!",
    greetingEn: "Kashmir Solidarity Day",
    greetingUr: "Youm-e-Yakjehti Kashmir",
    themeFrom: "from-green-600", themeTo: "to-emerald-700",
    priority: 70,
  },
  {
    id: "ramzan",
    nameEn: "Ramzan Mubarak",
    nameUr: "Ramzan Mubarak",
    startMonth: 2, startDay: 18, endMonth: 3, endDay: 19,
    emoji: "🌙",
    descEn: "This Ramzan, bless your pharmacy with AI-powered efficiency!",
    descUr: "Is Ramzan, apni pharmacy ko AI-powered efficiency se nawazein!",
    greetingEn: "Ramzan Mubarak!",
    greetingUr: "Ramzan Mubarak!",
    themeFrom: "from-emerald-600", themeTo: "to-teal-700",
    priority: 50,
  },
  {
    id: "shab-e-qadr",
    nameEn: "Shab-e-Qadr",
    nameUr: "Shab-e-Qadr Mubarak",
    startMonth: 3, startDay: 14, endMonth: 3, endDay: 15,
    emoji: "🤲",
    descEn: "The Night of Power — make a powerful decision for your pharmacy!",
    descUr: "Laylatul Qadr — apni pharmacy ke liye zabardast faisla karein!",
    greetingEn: "Shab-e-Qadr Mubarak!",
    greetingUr: "Shab-e-Qadr Mubarak!",
    themeFrom: "from-violet-600", themeTo: "to-purple-800",
    priority: 95,
  },
  {
    id: "eid-ul-fitr",
    nameEn: "Eid ul-Fitr",
    nameUr: "Eid ul-Fitr Mubarak",
    startMonth: 3, startDay: 20, endMonth: 3, endDay: 23,
    emoji: "🎊",
    descEn: "Celebrate Eid with a gift for your business — 30% OFF!",
    descUr: "Eid ka tohfa apne business ke liye — 30% OFF!",
    greetingEn: "Eid Mubarak!",
    greetingUr: "Eid Mubarak!",
    themeFrom: "from-emerald-500", themeTo: "to-green-700",
    priority: 100,
  },
  {
    id: "pakistan-day",
    nameEn: "Pakistan Day",
    nameUr: "Youm-e-Pakistan",
    startMonth: 3, startDay: 23, endMonth: 3, endDay: 23,
    emoji: "🇵🇰",
    descEn: "Celebrate Pakistan Day — invest in Pakistan's smartest pharmacy tech!",
    descUr: "Youm-e-Pakistan mubarak — Pakistan ki smartest pharmacy tech mein invest karein!",
    greetingEn: "Happy Pakistan Day!",
    greetingUr: "Youm-e-Pakistan Mubarak!",
    themeFrom: "from-green-600", themeTo: "to-emerald-800",
    priority: 90,
  },
  {
    id: "labour-day",
    nameEn: "Labour Day",
    nameUr: "Youm-e-Mazdoor",
    startMonth: 5, startDay: 1, endMonth: 5, endDay: 1,
    emoji: "💪",
    descEn: "Honour your hard work — let AI handle the heavy lifting!",
    descUr: "Apni mehnat ki izzat karein — AI ko bhari kaam karne dein!",
    greetingEn: "Happy Labour Day!",
    greetingUr: "Youm-e-Mazdoor Mubarak!",
    themeFrom: "from-red-600", themeTo: "to-orange-600",
    priority: 70,
  },
  {
    id: "eid-ul-adha",
    nameEn: "Eid ul-Adha",
    nameUr: "Eid ul-Adha Mubarak",
    startMonth: 5, startDay: 27, endMonth: 5, endDay: 30,
    emoji: "🐄",
    descEn: "This Eid ul-Adha, sacrifice manual work — go AI-powered!",
    descUr: "Is Eid ul-Adha, manual kaam qurban karein — AI-powered ho jaein!",
    greetingEn: "Eid ul-Adha Mubarak!",
    greetingUr: "Eid ul-Adha Mubarak!",
    themeFrom: "from-teal-600", themeTo: "to-cyan-700",
    priority: 100,
  },
  {
    id: "independence-day",
    nameEn: "Independence Day",
    nameUr: "Youm-e-Azadi Mubarak",
    startMonth: 8, startDay: 14, endMonth: 8, endDay: 14,
    emoji: "🇵🇰",
    descEn: "Free your pharmacy from old systems this Independence Day!",
    descUr: "Youm-e-Azadi pe apni pharmacy ko purane systems se azad karein!",
    greetingEn: "Happy Independence Day!",
    greetingUr: "Youm-e-Azadi Mubarak!",
    themeFrom: "from-green-600", themeTo: "to-emerald-700",
    priority: 95,
  },
  {
    id: "eid-milad",
    nameEn: "Eid Milad-un-Nabi \uFDFA",
    nameUr: "Eid Milad-un-Nabi \uFDFA Mubarak",
    startMonth: 9, startDay: 5, endMonth: 9, endDay: 6,
    emoji: "🕌",
    descEn: "Celebrate the blessed day with blessings for your business!",
    descUr: "Mubarak din ko apne business ke liye barkat ka zariya banaein!",
    greetingEn: "Eid Milad-un-Nabi Mubarak!",
    greetingUr: "Eid Milad-un-Nabi \uFDFA Mubarak!",
    themeFrom: "from-green-700", themeTo: "to-emerald-800",
    priority: 90,
  },
  {
    id: "defence-day",
    nameEn: "Defence Day",
    nameUr: "Youm-e-Difa",
    startMonth: 9, startDay: 6, endMonth: 9, endDay: 6,
    emoji: "🎖️",
    descEn: "Defend your pharmacy profits with AI-powered management!",
    descUr: "AI-powered management se apni pharmacy ke munafe ki hifazat karein!",
    greetingEn: "Happy Defence Day!",
    greetingUr: "Youm-e-Difa Mubarak!",
    themeFrom: "from-green-700", themeTo: "to-teal-800",
    priority: 75,
  },
  {
    id: "iqbal-day",
    nameEn: "Iqbal Day",
    nameUr: "Youm-e-Iqbal",
    startMonth: 11, startDay: 9, endMonth: 11, endDay: 9,
    emoji: "📖",
    descEn: "Dream big like Iqbal — modernize your pharmacy today!",
    descUr: "Iqbal ki tarah khwab dekhein — aaj hi apni pharmacy modern karein!",
    greetingEn: "Happy Iqbal Day!",
    greetingUr: "Youm-e-Iqbal Mubarak!",
    themeFrom: "from-amber-600", themeTo: "to-orange-700",
    priority: 75,
  },
  {
    id: "quaid-day",
    nameEn: "Quaid-e-Azam Day",
    nameUr: "Youm-e-Quaid",
    startMonth: 12, startDay: 25, endMonth: 12, endDay: 25,
    emoji: "⭐",
    descEn: "Follow the Quaid's vision — lead your pharmacy into the future!",
    descUr: "Quaid ka khwab — apni pharmacy ko mustaqbil mein le jaein!",
    greetingEn: "Happy Quaid-e-Azam Day!",
    greetingUr: "Youm-e-Quaid Mubarak!",
    themeFrom: "from-green-600", themeTo: "to-emerald-700",
    priority: 85,
  },
];

function isDateInRange(month: number, day: number, f: Festival): boolean {
  if (f.startMonth === f.endMonth) {
    return month === f.startMonth && day >= f.startDay && day <= f.endDay;
  }
  const afterStart = month > f.startMonth || (month === f.startMonth && day >= f.startDay);
  const beforeEnd = month < f.endMonth || (month === f.endMonth && day <= f.endDay);
  return afterStart && beforeEnd;
}

export function getActiveFestival(): Festival | null {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const active = festivals.filter((f) => isDateInRange(month, day, f));
  if (active.length === 0) return null;
  active.sort((a, b) => b.priority - a.priority);
  return active[0];
}
