import * as FaIcons from 'react-icons/fa';

export function isValidIcon(
  icon: string | undefined | null,
): icon is keyof typeof FaIcons {
  if (!icon) {
    return false;
  }
  return icon in FaIcons;
}
