export interface Crime {
    id: number;
    category: 'Violent Crimes' | 'Property Crimes' | 'Fraud & Cybercrime' | 'Public Disorder' | 'Traffic Incidents';
    title: string;
    location: {
      top: string;
      left: string;
    };
    date: string; // YYYY-MM-DD
    riskScore: number; // 1-10
  }
  
  const today = new Date();
  const getDate = (daysAgo: number): string => {
      const date = new Date();
      date.setDate(today.getDate() - daysAgo);
      return date.toISOString().split('T')[0];
  }
  
  export const crimeData: Crime[] = [
    { id: 1, category: 'Violent Crimes', title: 'Robbery with violence', location: { top: '30%', left: '40%' }, date: getDate(1), riskScore: 9 },
    { id: 2, category: 'Property Crimes', title: 'Burglary', location: { top: '50%', left: '55%' }, date: getDate(2), riskScore: 6 },
    { id: 3, category: 'Fraud & Cybercrime', title: 'M-Pesa fraud', location: { top: '25%', left: '60%' }, date: getDate(5), riskScore: 4 },
    { id: 4, category: 'Traffic Incidents', title: 'Hit-and-run', location: { top: '70%', left: '30%' }, date: getDate(0), riskScore: 8 },
    { id: 5, category: 'Property Crimes', title: 'Car theft', location: { top: '65%', left: '75%' }, date: getDate(8), riskScore: 7 },
    { id: 6, category: 'Public Disorder', title: 'Noise disturbance', location: { top: '45%', left: '25%' }, date: getDate(3), riskScore: 2 },
    { id: 7, category: 'Violent Crimes', title: 'Assault', location: { top: '20%', left: '20%' }, date: getDate(12), riskScore: 7 },
    { id: 8, category: 'Property Crimes', title: 'Vandalism', location: { top: '80%', left: '50%' }, date: getDate(20), riskScore: 3 },
    { id: 9, category: 'Traffic Incidents', title: 'Accident', location: { top: '55%', left: '45%' }, date: getDate(6), riskScore: 5 },
    { id: 10, category: 'Fraud & Cybercrime', title: 'Identity theft', location: { top: '35%', left: '70%' }, date: getDate(30), riskScore: 6 },
    { id: 11, category: 'Violent Crimes', title: 'Kidnapping', location: { top: '15%', left: '80%' }, date: getDate(4), riskScore: 10 },
    { id: 12, category: 'Property Crimes', title: 'Theft', location: { top: '75%', left: '15%' }, date: getDate(1), riskScore: 5 },
  ];