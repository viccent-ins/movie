import { format } from 'date-fns';

const textHelper = {
  dateStringTo12HourClock( dateString: string, isSecond = false ): string {
    const date = new Date( dateString );
    return isSecond ? format( date, 'yyyy/MM/dd h:mm:ss a' ) : format( date, 'yyyy/MM/dd h:mm a' );
  },
  dateStringTo24HourClock( dateString: string, isSecond = false, formation = 'yyyy/MM/dd HH:mm:ss' ): string {
    const date = new Date( dateString );
    return isSecond ? format( date, formation ) : format( date, 'yyyy/MM/dd HH:mm' );
  },
  addDefaultValue( text: string | undefined | null ): string {
    const defaultValue = '--';
    let result = text ?? defaultValue;
    result = result === '' ? defaultValue : result;
    return result;
  },
  getGmtMinusFourDate( originalDate: any, isStartDate = true ): number {
    const dateTime = new Date( originalDate );
    const utc = dateTime.getTime() + ( dateTime.getTimezoneOffset() * 60000 );
    const newGMTMinus4Date = new Date( utc + 3600000 * -4 );
    const date = isStartDate ? new Date( newGMTMinus4Date ).setHours( 0, 0, 0, 0 ) : new Date( newGMTMinus4Date ).setHours( 23, 59, 59, 59 );
    return date;
  },
  getDate( dateString: string, formatString = 'yyyy/MM/dd' ): string {
    const date = new Date( dateString );
    return format( date, formatString );
  },
  formatDate( dateString: string): string {
      let date = dateString.split('T');
      // return date;
      return date[0];
  },
  dateStringTo24Hour( dateString: string, isHasSecond = true ): string {
    const date = new Date( dateString );
    return isHasSecond ? format( date, 'yyyy-MM-dd HH:mm:ss' ) : format( date, 'yyyy-MM-dd HH:mm' );
  },
  dateStringTo12Hour( dateString: string ): string {
    const date = new Date( dateString );
    return dateString;
  },
  getDateHyphen( dateString: string ): string {
    const date = new Date( dateString );
    return format( date, 'yyyy-MM-dd' );
  },
  getDateTimeByGMT( originalDate: Date, gmt = 4, isUseGMTMinus4 = true ): Date {
    if ( !isUseGMTMinus4 ) {
      return originalDate;
    }
    const dateTime = new Date( originalDate );
    return new Date( dateTime.getTime() + ( ( dateTime.getTimezoneOffset() - 60 * gmt ) * 60000 ) );
  },
};

export default textHelper;
