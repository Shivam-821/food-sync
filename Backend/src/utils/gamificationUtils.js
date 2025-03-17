export const getBadge = (points) => {
  if (points >= 201) return "Legend";
  if (points >= 121) return "Champion";
  if (points >= 81) return "Achiever";
  if (points >= 31) return "Contributor";
  return "Rookie";
};
