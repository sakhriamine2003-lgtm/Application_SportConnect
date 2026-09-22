export function getInitials(firstName = '', lastName = '') {
  const fullName = `${firstName} ${lastName}`.trim();

  if (!fullName) return '?';

  const parts = fullName.split(/\s+/);
  if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();

  return parts[0].slice(0, 2).toUpperCase();
}
