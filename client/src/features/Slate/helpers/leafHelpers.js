export const getPxNumber = (value, fallback = 12) => {
  if (value === undefined || value === null) return fallback;

  const number = Number(String(value).replace(/[^0-9.]/g, ''));

  return Number.isNaN(number) ? fallback : number;
};

export const getNumber = (value, fallback) => {
  if (value === undefined || value === null || value === '') return fallback;

  const number = Number(value);

  return Number.isNaN(number) ? fallback : number;
};

export const roundToTenth = (value) => Number(getNumber(value, 0).toFixed(1));

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

  return resumeFontSize + containerFontSizeOffset + sectionFontSizeOffset + subsectionFontSizeOffset + fieldFontSizeOffset + leafFontSizeOffset;
};

export const getCascadedLineHeight = ({
  resumeStyling,
  containerStyling = {},
  sectionStyling = {},
  subsectionStyling = {},
  fieldStyling = {},
  leafStyling = {},
}) => {
  const resumeLineHeight = getNumber(resumeStyling?.lineHeight, 1.2);
  const containerLineHeightOffset = getNumber(containerStyling?.lineHeightOffset, 0);
  const sectionLineHeightOffset = getNumber(sectionStyling?.lineHeightOffset, 0);
  const subsectionLineHeightOffset = getNumber(subsectionStyling?.lineHeightOffset, 0);
  const fieldLineHeightOffset = getNumber(fieldStyling?.lineHeightOffset, 0);
  const leafLineHeightOffset = getNumber(leafStyling?.lineHeightOffset, 0);

  return roundToTenth(
    resumeLineHeight +
    containerLineHeightOffset +
    sectionLineHeightOffset +
    subsectionLineHeightOffset +
    fieldLineHeightOffset +
    leafLineHeightOffset
  );
};
