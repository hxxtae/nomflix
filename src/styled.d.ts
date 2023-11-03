// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    secondColor: string;
    thirdColor: string;
    bgColor: string;
    accentColor: string;
    mainColor: string;
  }
}
