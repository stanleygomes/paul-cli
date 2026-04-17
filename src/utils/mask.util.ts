export class MaskUtil {
  /**
   * Masks a string showing only the first and last characters.
   * @param value The string to mask
   * @param visibleFirst Number of characters to show at the start
   * @param visibleLast Number of characters to show at the end
   * @returns Masked string (e.g., "abcd****wxyz")
   */
  public static mask(value: string | undefined | null, visibleFirst = 4, visibleLast = 4): string {
    if (!value) return '';
    if (value.length <= visibleFirst + visibleLast) return value;

    const first = value.slice(0, visibleFirst);
    const last = value.slice(-visibleLast);
    const masked = '*'.repeat(value.length - (visibleFirst + visibleLast));

    return `${first}${masked}${last}`;
  }
}
