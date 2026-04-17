import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { I18n } from '@utils/i18n/i18n.util.js';

export class DateUtil {
  private static getLocale() {
    return I18n.language === 'pt' ? ptBR : enUS;
  }

  public static humanize(date: string | Date | undefined): string {
    if (!date) return '-';

    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '-';

    return format(d, 'Pp', { locale: DateUtil.getLocale() });
  }
}
