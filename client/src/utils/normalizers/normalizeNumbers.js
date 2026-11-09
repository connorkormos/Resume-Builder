import { roundParseFloat } from '../formatters.js';

// Only these formatting properties represent independently rounded settings.
const roundedFormattingKeys = new Set([
  'fontSize', 'fontSizeOffset', 'lineHeight', 'lineHeightOffset',
  'marginLeft', 'top', 'right', 'bottom', 'left',
  'horizontal', 'vertical', 'section', 'subsection', 'field', 'header',
  'width', 'height',
]);

// Match a complete decimal value, optionally followed by a supported CSS unit.
const numericFormattingValue = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(rem|px|%)?$/;

export const normalizeNumbers = (key, value) => {
  if (!roundedFormattingKeys.has(key)) return value;

  if (typeof value === 'number') {
    return Number.isFinite(value) ? roundParseFloat(value) : value;
  }

  if (typeof value !== 'string') return value;

  const match = value.trim().match(numericFormattingValue);
  if (!match || !Number.isFinite(Number(match[1]))) return value;

  const rounded = roundParseFloat(match[1]);
  return match[2] ? `${rounded}${match[2]}` : rounded;
};