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
  const resumeFontSize = roundParseFloat(resumeStyling?.fontSize, 12);
  const containerFontSizeOffset = roundParseFloat(containerStyling?.fontSizeOffset);
  const sectionFontSizeOffset = roundParseFloat(sectionStyling?.fontSizeOffset);
  const subsectionFontSizeOffset = roundParseFloat(subsectionStyling?.fontSizeOffset);
  const fieldFontSizeOffset = roundParseFloat(fieldStyling?.fontSizeOffset);
  const leafFontSizeOffset = roundParseFloat(leafStyling?.fontSizeOffset);

  const cascadedFontSize = resumeFontSize + containerFontSizeOffset + sectionFontSizeOffset + subsectionFontSizeOffset + fieldFontSizeOffset + leafFontSizeOffset;
  return roundParseFloat(cascadedFontSize);
};

export const getCascadedLineHeight = ({
  resumeStyling,
  containerStyling = {},
  sectionStyling = {},
  subsectionStyling = {},
  fieldStyling = {},
  leafStyling = {},
}) => {
  const resumeLineHeight = roundParseFloat(resumeStyling?.lineHeight, 1.2);
  const containerLineHeightOffset = roundParseFloat(containerStyling?.lineHeightOffset);
  const sectionLineHeightOffset = roundParseFloat(sectionStyling?.lineHeightOffset);
  const subsectionLineHeightOffset = roundParseFloat(subsectionStyling?.lineHeightOffset);
  const fieldLineHeightOffset = roundParseFloat(fieldStyling?.lineHeightOffset);
  const leafLineHeightOffset = roundParseFloat(leafStyling?.lineHeightOffset);

  let total = (
    resumeLineHeight +
    containerLineHeightOffset +
    sectionLineHeightOffset +
    subsectionLineHeightOffset +
    fieldLineHeightOffset +
    leafLineHeightOffset
  );
  return roundParseFloat(total);
};
