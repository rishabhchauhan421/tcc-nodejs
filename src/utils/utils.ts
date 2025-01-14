import { randomBytes, scryptSync } from 'crypto';

export class CustomRegex {
  static phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  static pincodeRegex = new RegExp(/^\d{6}$/);
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'JPY' | 'CNY';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'INR', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptSync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

export async function comparePassword(
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split('.');
  const buf = (await scryptSync(suppliedPassword, salt ?? '', 64)) as Buffer;
  //  console.log('buf: ' + buf.toString());
  console.log('buf.toString(hex): ', buf.toString('hex'));
  console.log('hashedPassword: ', hashedPassword);
  return buf.toString('hex') === hashedPassword;
  // return timingSafeEqual(buf.toString('hex'), hashedPassword);
}

export function getCurrentDate(separator = '-') {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

export function decimalPrecision(value: number, precision: number) {
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function getFileExtensionFromFileName(fileName: string): string {
  return fileName.split('.').pop() ?? '';
}

export function sanitizeInputFields(text: string) {
  //replacing multiple spaces with single space
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

export function toCamelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: any, index: any) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getAverage({
  ratings,
  precision,
}: {
  ratings: number[];
  precision: number;
}) {
  const sum = ratings.reduce((a, b) => a + b, 0);
  // show decimal precision
  return (sum / ratings.length).toFixed(precision);
}

export function extractHex({ item }: { item: string }) {
  const hex = item.split('_')[1];
  return '#' + hex;
}

export function calculatePercentage({
  oldValue,
  newValue,
}: {
  oldValue: number;
  newValue: number;
}): number {
  const percentage = decimalPrecision(
    ((newValue - oldValue) / oldValue) * 100,
    0
  );
  if (percentage < 0) {
    return -1 * percentage;
  }
  return percentage;
}

export function hexToText(hex: string) {
  switch (hex) {
    case '#321541':
      return 'Purple';
    case '#F9D168':
      return 'Yellow';
    case '#A50303':
      return 'Red';
    case '#19E4FF':
      return 'Sky Blue';
    case '#151515':
      return 'Black';
    case '#6E6E6E':
      return 'Charcoal Melange';
    case '#22482E':
      return 'Bottle Green';
    case '#C3C3C3':
      return 'Grey Melange';
    case '#2D314A':
      return 'Navy Blue';
    case '#1F286A':
      return 'Royal Blue';
    case '#FFFFFF':
      return 'White';
    case '#159512':
      return 'Flag Green';
    case '#EF9A31':
      return 'Golden Yellow';
    case '#1C100F':
      return 'Coffee Brown';
    case '#002A2F':
      return 'Petrol Blue';
    case '#3A3E41':
      return 'Steel Grey';
    case '#453E2F':
      return 'Olive Green';
    case '#CF8F26':
      return 'Mustard Yellow';
    case '#FCFA30':
      return 'New Yellow';
    case '#FFD5DB':
      return 'Light Baby Pink';
    case '#2D0101':
      return 'Maroon';
    case '#7B2F1D':
      return 'Brick Red';
    case '#E65E00':
      return 'Orange';
    case '#EBCD8B':
      return 'Beige';
    case '#BBB1D2':
      return 'Lavender';
    case '#FFDEC6':
      return 'Peach';
    case '#CCF5C9':
      return 'Jade';
    case '#C2745F':
      return 'Copper';
    case '#FFDEC6':
      return 'Peach';
    case '#CC9D93':
      return 'Mushroom';
    case '#E29891':
      return 'Flamingo';
    case '#C86E4E':
      return 'Coral';
    case '#BFFCF7':
      return 'Mint';
    case '#A4CEF8':
      return 'Baby Blue';
    case '#9D6333':
      return 'Khaki';
    case '#7B2F1D':
      return 'Brick Red';
    default:
      return 'No Color';
  }
}
