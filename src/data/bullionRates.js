export const defaultBullionRates = {
  gold24k: 7890, // INR per gram
  gold22k: 7235, // 916 Hallmark per gram
  gold18k: 5920, // 750 Hallmark per gram
  gold14k: 4610, // 585 Hallmark per gram
  silver925: 96,  // INR per gram
  lastUpdated: new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
};
