import _ from 'lodash';

const numberFormatHelper = {
  floorTo2Digit( number: number ): number {
    return _.floor( number, 2 );
  },
  addAccountingFormat( number: number ): string {
    const string = number.toFixed( 2 );
    const [integer, decimal] = string.split( '.' );
    const newInteger = integer.replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
    return [newInteger, decimal].filter( ( x ) => x ).join( '.' );
  },
  phoneNumber( number: number ): string {
        return `0${number}`;
  },
};

export default numberFormatHelper;
