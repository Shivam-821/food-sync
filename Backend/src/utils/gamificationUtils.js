export const getBadge = (points) => {
  if (points >= 151) return "Legend";
  if (points >= 101) return "Champion";
  if (points >= 61) return "Achiever";
  if (points >= 21) return "Contributor";
  return "Rookie";
};
