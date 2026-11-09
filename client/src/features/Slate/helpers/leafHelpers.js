import { roundParseFloat } from "@/utils/formatters.js";

export const getCascadedColor = ({
  resumeStyling,
  containerStyling,
  sectionStyling,
  subsectionStyling,
  fieldStyling,
  leafStyling,
}) => (
  leafStyling?.color ||
  fieldStyling?.color ||
  subsectionStyling?.color ||
  sectionStyling?.color ||
  containerStyling?.color ||
  resumeStyling?.color
);

export const getPxNumber = (value, fallback = 12) => {
  if (value === undefined || value === null) return fallback;

  const number = Number(String(value).replace(/[^0-9.]/g, ''));

  return Number.isNaN(number) ? fallback : number;
};

export const getCascadedFontSize = ({
  resumeStyling,
  containerStyling = {},
  sectionStyling = {},
  subsectionStyling = {},
  fieldStyling = {},
  leafStyling = {},
}) => {
  const resumeFontSize = getPxNumber(resumeStyling?.fontSize);
  const containerFontSizeOffset = containerStyling?.fontSizeOffset ?? 0;
  const sectionFontSizeOffset = sectionStyling?.fontSizeOffset ?? 0;
  const subsectionFontSizeOffset = subsectionStyling?.fontSizeOffset ?? 0;
  const fieldFontSizeOffset = fieldStyling?.fontSizeOffset ?? 0;
  const leafFontSizeOffset = leafStyling?.fontSizeOffset ?? 0;

  const cascadedFontSize = resumeFontSize + containerFontSizeOffset + sectionFontSizeOffset + subsectionFontSizeOffset + fieldFontSizeOffset + leafFontSizeOffset;
  return +Number.parseFloat(cascadedFontSize).toFixed(2);
};

export const getCascadedLineHeight = ({
  resumeStyling,
  containerStyling = {},
  sectionStyling = {},
  subsectionStyling = {},
  fieldStyling = {},
  leafStyling = {},
}) => {
  const resumeLineHeight = roundParseFloat(resumeStyling?.lineHeight ?? 1.2);
  const containerLineHeightOffset = roundParseFloat(containerStyling?.lineHeightOffset ?? 0);
  const sectionLineHeightOffset = roundParseFloat(sectionStyling?.lineHeightOffset ?? 0);
  const subsectionLineHeightOffset = roundParseFloat(subsectionStyling?.lineHeightOffset ?? 0);
  const fieldLineHeightOffset = roundParseFloat(fieldStyling?.lineHeightOffset ?? 0);
  const leafLineHeightOffset = roundParseFloat(leafStyling?.lineHeightOffset ?? 0);

  let total = (
    resumeLineHeight +
    containerLineHeightOffset +
    sectionLineHeightOffset +
    subsectionLineHeightOffset +
    fieldLineHeightOffset +
    leafLineHeightOffset
  );
  return +Number.parseFloat(total).toFixed(2);
};
