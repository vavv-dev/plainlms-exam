import { TFunction } from 'i18next';

/**
 * Get from local storage with default value
 * @param key - The key to get from local storage
 * @param defaultValue - The default value to return if the key is not found
 * @returns The value from local storage or the default value
 */
export const parseLocalStorage = <T>(key: string, defaultValue: T) => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // if already raw data saved, JSON.prase will fail
      console.error(e);
    }
  }
  return defaultValue;
};

/**
 * Format a date as a relative time string
 * @param date - The date to format
 * @param t - The translation function
 * @returns The formatted relative time string
 */
export function formatRelativeTime(date: Date | string, t: TFunction<string>) {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return t('relativeTime.past.seconds', { count: diffInSeconds, ns: 'common' });
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return t('relativeTime.past.minutes', { count: diffInMinutes, ns: 'common' });
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return t('relativeTime.past.hours', { count: diffInHours, ns: 'common' });
  } else if (diffInSeconds < 604800) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return t('relativeTime.past.days', { count: diffInDays, ns: 'common' });
  } else if (diffInSeconds < 2419200) {
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    return t('relativeTime.past.weeks', { count: diffInWeeks, ns: 'common' });
  } else if (diffInSeconds < 29030400) {
    const diffInMonths = Math.floor(diffInSeconds / 2419200);
    return t('relativeTime.past.months', { count: diffInMonths, ns: 'common' });
  } else {
    const diffInYears = Math.floor(diffInSeconds / 29030400);
    return t('relativeTime.past.years', { count: diffInYears, ns: 'common' });
  }
}

/**
 * Format a duration in seconds as a string in the format "HH:MM:SS" or "MM:SS"
 * @param seconds - The duration in seconds
 * @returns The formatted duration. example: 1:02:03
 */
export function formatDuration(seconds: number | string): string {
  // Ensure the input is a positive integer
  if (typeof seconds === 'string') {
    seconds = parseInt(seconds, 10);
  }
  seconds = Math.abs(Math.round(seconds));

  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // Helper function to add leading zeros
  const addLeadingZero = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

  // Format the output based on the presence of hours
  if (hours === 0) {
    return `${addLeadingZero(minutes)}:${addLeadingZero(remainingSeconds)}`;
  } else {
    return `${hours}:${addLeadingZero(minutes)}:${addLeadingZero(remainingSeconds)}`;
  }
}

/**
 * Guess the average color of an image
 * @param image - The image to guess the average color of
 * @returns The average color as a CSS rgba string
 */
export async function guessAverageColor(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // extract average color
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      let sumR = 0,
        sumG = 0,
        sumB = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        sumR += imageData[i];
        sumG += imageData[i + 1];
        sumB += imageData[i + 2];
      }
      if (sumR === 0 && sumG === 0 && sumB === 0) {
        resolve('');
      }
      const avgR = Math.abs(100 - Math.round(sumR / (imageData.length / 4)));
      const avgG = Math.abs(100 - Math.round(sumG / (imageData.length / 4)));
      const avgB = Math.abs(100 - Math.round(sumB / (imageData.length / 4)));

      resolve(`rgba(${avgR}, ${avgG}, ${avgB}, 0.5)`);
    };

    img.src = URL.createObjectURL(blob);
  });
}

/**
 * Generate random dark colors
 * @returns An array of two random dark colors
 */
export function generateRandomDarkColors(seed: string): string[] {
  const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);

  // Generate random RGB values for the first color using the hash
  const color1 = {
    r: (hash * 9301 + 49297) % 233280,
    g: (hash * 49297 + 233280) % 233280,
    b: (hash * 233280 + 9301) % 233280,
  };

  // Adjust the second color to be similar to the first color
  const color2 = {
    r: (color1.r + 1) % 128, // Adjust this value to control the similarity
    g: (color1.g + 1) % 128,
    b: (color1.b + 1) % 128,
  };

  // Convert RGB values to hexadecimal format
  const hexColor1 = `rgba(${color1.r % 128}, ${color1.g % 128}, ${color1.b % 128}, 0.5)`;
  const hexColor2 = `rgba(${color2.r % 128}, ${color2.g % 128}, ${color2.b % 128}, 0.8)`;

  return [hexColor1, hexColor2];
}

/**
 * Parse a JWT token
 * @param token - The JWT token to parse
 * @returns The parsed JWT token
 * @returns null if the token is invalid
 */
export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
