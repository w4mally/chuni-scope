import { RATING_GRADIENTS, RATING_COLORS } from '../constants/colors';

export const getRatingStyle = (ratingStr: string) => {
    const r = parseFloat(ratingStr);

  if (r >= 16.00) return RATING_GRADIENTS.RAINBOW;
  if (r >= 15.25) return RATING_GRADIENTS.PLATINUM;
  if (r >= 14.50) return RATING_COLORS.GOLD; // 金
  if (r >= 13.25) return RATING_COLORS.SILVER;  // 銀
  if (r >= 12.00) return RATING_COLORS.BRONZE;  // 銅
  if (r >= 10.00) return RATING_COLORS.PURPLE; // 紫
  if (r >= 7.00)  return RATING_COLORS.RED;    // 赤
  if (r >= 4.00)  return RATING_COLORS.ORANGE; // 橙
  return RATING_COLORS.GREEN;                // 緑
};