import { css } from '@webformula/pax-core';

export default function () {
  return css`
    :root {
      /* --- text --- */
      --mdw-theme-text--primary--light: #ffffff;
      --mdw-theme-text--secondary--light: rgba(255,255,255, .7);
      --mdw-theme-text--error--light: rgba(255,255,255, .7);
      --mdw-theme-text--hint--light: rgba(255,255,255, .5);
      --mdw-theme-text--disabled--light: rgba(255,255,255, .5);
      --mdw-theme-text--icon--light: rgba(255,255,255, .5);

      --mdw-theme-text--primary--dark: rgba(0,0,0, .87);
      --mdw-theme-text--secondary--dark: rgba(0,0,0, .54);
      --mdw-theme-text--error--dark: rgba(0,0,0, .54);
      --mdw-theme-text--hint--dark: rgba(0,0,0, .38);
      --mdw-theme-text--disabled--dark: rgba(0,0,0, .38);
      --mdw-theme-text--icon--dark: rgba(0,0,0, .38);

      --mdw-theme-text--on-primary--light: #FFFFFF;
      --mdw-theme-text--on-secondary--light: #000000;
      --mdw-theme-text--on-error--light: #FFFFFF;
      --mdw-theme-text--on-background--light: #000000;
      --mdw-theme-text--on-surface--light: #000000;

      --mdw-theme-text--on-primary--dark: #000000;
      --mdw-theme-text--on-secondary--dark: #FFFFFF;
      --mdw-theme-text--on-error--dark: #000000;
      --mdw-theme-text--on-background--dark: #FFFFFF;
      --mdw-theme-text--on-surface--dark: #FFFFFF;

      --mdw-theme-text--heading--light: #212121;
      --mdw-theme-text--heading--dark: #ececec;

      --mdw-theme-text--body--light: #616161;
      --mdw-theme-text--body--dark: #b5b5b5;


      /* --- surfaces and backgrounds --- */
      --mdw-theme-background--light: #fafafa;
      --mdw-theme-background--dark: #121212;

      --mdw-theme-foreground--light: #121212;
      --mdw-theme-foreground--dark: #fafafa;

      --mdw-theme-surface--light: #fafafa;
      --mdw-theme-surface--dark: #121212;

      --mdw-theme-surface_elevation_1--light: #f6f6f6;
      --mdw-theme-surface_elevation_1--dark: #303030;

      --mdw-theme-divider--dark: rgba(0, 0, 0, 0.12);
      --mdw-theme-divider--light: rgba(255, 255, 255, 0.12);

      --mdw-theme-divider--on-background--dark: var(--mdw-theme-divider--light);
      --mdw-theme-divider--on-background--light: var(--mdw-theme-divider--dark);

      --mdw-theme-background_white--light: #ffffff;
      --mdw-theme-background_white--dark: #121212;


      /* --- one offs for components --- */
      --mdw-theme-switchtrack--light: #000000;
      --mdw-theme-switchtrack--dark: rgba(255,255,255, .32);

      --mdw-theme-checkboxborder--light: rgba(0,0,0, .54);
      --mdw-theme-checkboxborder--dark: rgba(255,255,255, .5);

      --mdw-theme-checkboxborderdisabled--light: rgba(0,0,0, .26);
      --mdw-theme-checkboxborderdisabled--dark: rgba(255,255,255, .24);

      --mdw-theme-snackbarcontainer--light: var(--mdw-theme-background--dark);
      --mdw-theme-snackbarcontainer--dark: var(--mdw-theme-background--light);

      --mdw-theme-text--on-snackbar--light: var(--mdw-theme-text--secondary);
      --mdw-theme-text--on-snackbar--dark: #000000;

      --mdw-theme-list_item_focus--light: rgba(0,0,0,.06);
      --mdw-theme-list_item_focus--dark: rgba(100,100,100,.16);

      --mdw-theme-outline_border--light: rgba(0,0,0,.24);
      --mdw-theme-outline_border--dark: rgba(255,255,255,.24);

      --mdw-theme-textfield_background--light: #f5f5f5;
      --mdw-theme-textfield_background--dark: #303030;


      /* --- palettes --- */
      /* By default, shades 500, 300 800 and A100 are used for primary and warn intentions, while A200, A100, A400 and A700 are used for accent */

      /* red */
      --mdw-theme-palette--red-50: #ffebee;
      --mdw-theme-palette--red-100: #ffcdd2;
      --mdw-theme-palette--red-200: #ef9a9a;
      --mdw-theme-palette--red-300: #e57373;
      --mdw-theme-palette--red-400: #ef5350;
      --mdw-theme-palette--red-500: #f44336;
      --mdw-theme-palette--red-600: #e53935;
      --mdw-theme-palette--red-700: #d32f2f;
      --mdw-theme-palette--red-800: #c62828;
      --mdw-theme-palette--red-900: #b71c1c;
      --mdw-theme-palette--red-A100: #ff8a80;
      --mdw-theme-palette--red-A200: #ff5252;
      --mdw-theme-palette--red-A400: #ff1744;
      --mdw-theme-palette--red-A700: #d50000;
      --mdw-theme-palette--red--light: var(--mdw-theme-palette--red-500);
      --mdw-theme-palette--red--dark: var(--mdw-theme-palette--red-200);

      /* pink */
      --mdw-theme-palette--pink-50: #FCE4EC;
      --mdw-theme-palette--pink-100: #F8BBD0;
      --mdw-theme-palette--pink-200: #F48FB1;
      --mdw-theme-palette--pink-300: #F06292;
      --mdw-theme-palette--pink-400: #EC407A;
      --mdw-theme-palette--pink-500: #E91E63;
      --mdw-theme-palette--pink-600: #D81B60;
      --mdw-theme-palette--pink-700: #C2185B;
      --mdw-theme-palette--pink-800: #AD1457;
      --mdw-theme-palette--pink-900: #880E4F;
      --mdw-theme-palette--pink-A100: #FF80AB;
      --mdw-theme-palette--pink-A200: #FF4081;
      --mdw-theme-palette--pink-A400: #F50057;
      --mdw-theme-palette--pink-A700: #C51162;
      --mdw-theme-palette--pink--light: var(--mdw-theme-palette--pink-500);
      --mdw-theme-palette--pink--dark: var(--mdw-theme-palette--pink-200);

      /* purple */
      --mdw-theme-palette--purple-50: #f3e5f5;
      --mdw-theme-palette--purple-100: #e1bee7;
      --mdw-theme-palette--purple-200: #ce93d8;
      --mdw-theme-palette--purple-300: #ba68c8;
      --mdw-theme-palette--purple-400: #ab47bc;
      --mdw-theme-palette--purple-500: #9c27b0;
      --mdw-theme-palette--purple-600: #8e24aa;
      --mdw-theme-palette--purple-700: #7b1fa2;
      --mdw-theme-palette--purple-800: #6a1b9a;
      --mdw-theme-palette--purple-900: #4a148c;
      --mdw-theme-palette--purple-A100: #ea80fc;
      --mdw-theme-palette--purple-A200: #e040fb;
      --mdw-theme-palette--purple-A400: #d500f9;
      --mdw-theme-palette--purple-A700: #aa00ff;
      --mdw-theme-palette--purple--light: var(--mdw-theme-palette--purple-500);
      --mdw-theme-palette--purple--dark: var(--mdw-theme-palette--purple-200);

      /* deeppurple */
      --mdw-theme-palette--deeppurple-50: #ede7f6;
      --mdw-theme-palette--deeppurple-100: #d1c4e9;
      --mdw-theme-palette--deeppurple-200: #b39ddb;
      --mdw-theme-palette--deeppurple-300: #9575cd;
      --mdw-theme-palette--deeppurple-400: #7e57c2;
      --mdw-theme-palette--deeppurple-500: #673ab7;
      --mdw-theme-palette--deeppurple-600: #5e35b1;
      --mdw-theme-palette--deeppurple-700: #512da8;
      --mdw-theme-palette--deeppurple-800: #4527a0;
      --mdw-theme-palette--deeppurple-900: #311b92;
      --mdw-theme-palette--deeppurple-A100: #b388ff;
      --mdw-theme-palette--deeppurple-A200: #7c4dff;
      --mdw-theme-palette--deeppurple-A400: #651fff;
      --mdw-theme-palette--deeppurple-A700: #6200ea;
      --mdw-theme-palette--deeppurple--light: #6002ee;
      --mdw-theme-palette--deeppurple--dark: var(--mdw-theme-palette--deeppurple-200);

      /* Indigo */
      --mdw-theme-palette--indigo-50: #E8EAF6;
      --mdw-theme-palette--indigo-100: #C5CAE9;
      --mdw-theme-palette--indigo-200: #9FA8DA;
      --mdw-theme-palette--indigo-300: #7986CB;
      --mdw-theme-palette--indigo-400: #5C6BC0;
      --mdw-theme-palette--indigo-500: #3F51B5;
      --mdw-theme-palette--indigo-600: #3949AB;
      --mdw-theme-palette--indigo-700: #303F9F;
      --mdw-theme-palette--indigo-800: #283593;
      --mdw-theme-palette--indigo-900: #1A237E;
      --mdw-theme-palette--indigo-A100: #8C9EFF;
      --mdw-theme-palette--indigo-A200: #536DFE;
      --mdw-theme-palette--indigo-A400: #3D5AFE;
      --mdw-theme-palette--indigo-A700: #304FFE;
      --mdw-theme-palette--indigo--light: var(--mdw-theme-palette--indigo-500);
      --mdw-theme-palette--indigo--dark: var(--mdw-theme-palette--indigo-200);

      /* blue */
      --mdw-theme-palette--blue-50: #e3f2fd;
      --mdw-theme-palette--blue-100: #bbdefb;
      --mdw-theme-palette--blue-200: #90caf9;
      --mdw-theme-palette--blue-300: #64b5f6;
      --mdw-theme-palette--blue-400: #42a5f5;
      --mdw-theme-palette--blue-500: #2196f3;
      --mdw-theme-palette--blue-600: #1e88e5;
      --mdw-theme-palette--blue-700: #1976d2;
      --mdw-theme-palette--blue-800: #1565c0;
      --mdw-theme-palette--blue-900: #0d47a1;
      --mdw-theme-palette--blue-A100: #82b1ff;
      --mdw-theme-palette--blue-A200: #448aff;
      --mdw-theme-palette--blue-A400: #2979ff;
      --mdw-theme-palette--blue-A700: #2962ff;
      --mdw-theme-palette--blue--light: var(--mdw-theme-palette--blue-500);
      --mdw-theme-palette--blue--dark: var(--mdw-theme-palette--blue-200);

      /* Light blue */
      --mdw-theme-palette--lightblue-50: #E1F5FE;
      --mdw-theme-palette--lightblue-100: #B3E5FC;
      --mdw-theme-palette--lightblue-200: #81D4FA;
      --mdw-theme-palette--lightblue-300: #4FC3F7;
      --mdw-theme-palette--lightblue-400: #29B6F6;
      --mdw-theme-palette--lightblue-500: #03A9F4;
      --mdw-theme-palette--lightblue-600: #039BE5;
      --mdw-theme-palette--lightblue-700: #0288D1;
      --mdw-theme-palette--lightblue-800: #0277BD;
      --mdw-theme-palette--lightblue-900: #01579B;
      --mdw-theme-palette--lightblue-A100: #80D8FF;
      --mdw-theme-palette--lightblue-A200: #40C4FF;
      --mdw-theme-palette--lightblue-A400: #00B0FF;
      --mdw-theme-palette--lightblue-A700: #0091EA;
      --mdw-theme-palette--lightblue--light: var(--mdw-theme-palette--lightblue-500);
      --mdw-theme-palette--lightblue--dark: var(--mdw-theme-palette--lightblue-200);

      /* Cyan */
      --mdw-theme-palette--cyan-50: #E0F7FA;
      --mdw-theme-palette--cyan-100: #B2EBF2;
      --mdw-theme-palette--cyan-200: #80DEEA;
      --mdw-theme-palette--cyan-300: #4DD0E1;
      --mdw-theme-palette--cyan-400: #26C6DA;
      --mdw-theme-palette--cyan-500: #00BCD4;
      --mdw-theme-palette--cyan-600: #00ACC1;
      --mdw-theme-palette--cyan-700: #0097A7;
      --mdw-theme-palette--cyan-800: #00838F;
      --mdw-theme-palette--cyan-900: #006064;
      --mdw-theme-palette--cyan-A100: #84FFFF;
      --mdw-theme-palette--cyan-A200: #18FFFF;
      --mdw-theme-palette--cyan-A400: #00E5FF;
      --mdw-theme-palette--cyan-A700: #00B8D4;
      --mdw-theme-palette--cyan--light: var(--mdw-theme-palette--cyan-500);
      --mdw-theme-palette--cyan--dark: var(--mdw-theme-palette--cyan-200);

      /* teal */
      --mdw-theme-palette--teal-50: #e0f2f1;
      --mdw-theme-palette--teal-100: #b2dfdb;
      --mdw-theme-palette--teal-200: #80cbc4;
      --mdw-theme-palette--teal-300: #4db6ac;
      --mdw-theme-palette--teal-400: #26a69a;
      --mdw-theme-palette--teal-500: #009688;
      --mdw-theme-palette--teal-600: #00897b;
      --mdw-theme-palette--teal-700: #00796b;
      --mdw-theme-palette--teal-800: #00695c;
      --mdw-theme-palette--teal-900: #004d40;
      --mdw-theme-palette--teal-A100: #a7ffeb;
      --mdw-theme-palette--teal-A200: #64ffda;
      --mdw-theme-palette--teal-A400: #1de9b6;
      --mdw-theme-palette--teal-A700: #00bfa5;
      --mdw-theme-palette--teal--light: var(--mdw-theme-palette--teal-500);
      --mdw-theme-palette--teal--dark: var(--mdw-theme-palette--teal-200);

      /* green */
      --mdw-theme-palette--green-50: #E8F5E9;
      --mdw-theme-palette--green-100: #C8E6C9;
      --mdw-theme-palette--green-200: #A5D6A7;
      --mdw-theme-palette--green-300: #81C784;
      --mdw-theme-palette--green-400: #66BB6A;
      --mdw-theme-palette--green-500: #4CAF50;
      --mdw-theme-palette--green-600: #43A047;
      --mdw-theme-palette--green-700: #388E3C;
      --mdw-theme-palette--green-800: #2E7D32;
      --mdw-theme-palette--green-900: #1B5E20;
      --mdw-theme-palette--green-A100: #B9F6CA;
      --mdw-theme-palette--green-A200: #69F0AE;
      --mdw-theme-palette--green-A400: #00E676;
      --mdw-theme-palette--green-A700: #00C853;
      --mdw-theme-palette--green--light: var(--mdw-theme-palette--green-500);
      --mdw-theme-palette--green--dark: var(--mdw-theme-palette--green-200);

      /* lightgreen */
      --mdw-theme-palette--lightgreen-50: #F1F8E9;
      --mdw-theme-palette--lightgreen-100: #DCEDC8;
      --mdw-theme-palette--lightgreen-200: #C5E1A5;
      --mdw-theme-palette--lightgreen-300: #AED581;
      --mdw-theme-palette--lightgreen-400: #9CCC65;
      --mdw-theme-palette--lightgreen-500: #8BC34A;
      --mdw-theme-palette--lightgreen-600: #7CB342;
      --mdw-theme-palette--lightgreen-700: #689F38;
      --mdw-theme-palette--lightgreen-800: #558B2F;
      --mdw-theme-palette--lightgreen-900: #33691E;
      --mdw-theme-palette--lightgreen-A100: #CCFF90;
      --mdw-theme-palette--lightgreen-A200: #B2FF59;
      --mdw-theme-palette--lightgreen-A400: #76FF03;
      --mdw-theme-palette--lightgreen-A700: #64DD17;
      --mdw-theme-palette--lightgreen--light: var(--mdw-theme-palette--lightgreen-500);
      --mdw-theme-palette--lightgreen--dark: var(--mdw-theme-palette--lightgreen-200);

      /* lime */
      --mdw-theme-palette--lime-50: #F9FBE7;
      --mdw-theme-palette--lime-100: #F0F4C3;
      --mdw-theme-palette--lime-200: #E6EE9C;
      --mdw-theme-palette--lime-300: #DCE775;
      --mdw-theme-palette--lime-400: #D4E157;
      --mdw-theme-palette--lime-500: #CDDC39;
      --mdw-theme-palette--lime-600: #C0CA33;
      --mdw-theme-palette--lime-700: #AFB42B;
      --mdw-theme-palette--lime-800: #9E9D24;
      --mdw-theme-palette--lime-900: #827717;
      --mdw-theme-palette--lime-A100: #F4FF81;
      --mdw-theme-palette--lime-A200: #EEFF41;
      --mdw-theme-palette--lime-A400: #C6FF00;
      --mdw-theme-palette--lime-A700: #AEEA00;
      --mdw-theme-palette--lime--light: var(--mdw-theme-palette--lime-500);
      --mdw-theme-palette--lime--dark: var(--mdw-theme-palette--lime-200);

      /* yellow */
      --mdw-theme-palette--yellow-50: #FFFDE7;
      --mdw-theme-palette--yellow-100: #FFF9C4;
      --mdw-theme-palette--yellow-200: #FFF59D;
      --mdw-theme-palette--yellow-300: #FFF176;
      --mdw-theme-palette--yellow-400: #FFEE58;
      --mdw-theme-palette--yellow-500: #FFEB3B;
      --mdw-theme-palette--yellow-600: #FDD835;
      --mdw-theme-palette--yellow-700: #FBC02D;
      --mdw-theme-palette--yellow-800: #F9A825;
      --mdw-theme-palette--yellow-900: #F57F17;
      --mdw-theme-palette--yellow-A100: #FFFF8D;
      --mdw-theme-palette--yellow-A200: #FFFF00;
      --mdw-theme-palette--yellow-A400: #FFEA00;
      --mdw-theme-palette--yellow-A700: #FFD600;
      --mdw-theme-palette--yellow--light: var(--mdw-theme-palette--yellow-500);
      --mdw-theme-palette--yellow--dark: var(--mdw-theme-palette--yellow-200);

      /* amber */
      --mdw-theme-palette--amber-50: #FFF8E1;
      --mdw-theme-palette--amber-100: #FFECB3;
      --mdw-theme-palette--amber-200: #FFE082;
      --mdw-theme-palette--amber-300: #FFD54F;
      --mdw-theme-palette--amber-400: #FFCA28;
      --mdw-theme-palette--amber-500: #FFC107;
      --mdw-theme-palette--amber-600: #FFB300;
      --mdw-theme-palette--amber-700: #FFA000;
      --mdw-theme-palette--amber-800: #FF8F00;
      --mdw-theme-palette--amber-900: #FF6F00;
      --mdw-theme-palette--amber-A100: #FFE57F;
      --mdw-theme-palette--amber-A200: #FFD740;
      --mdw-theme-palette--amber-A400: #FFC400;
      --mdw-theme-palette--amber-A700: #FFAB00;
      --mdw-theme-palette--amber--light: var(--mdw-theme-palette--amber-500);
      --mdw-theme-palette--amber--dark: var(--mdw-theme-palette--amber-200);

      /* orange */
      --mdw-theme-palette--orange-50: #FFF3E0;
      --mdw-theme-palette--orange-100: #FFE0B2;
      --mdw-theme-palette--orange-200: #FFCC80;
      --mdw-theme-palette--orange-300: #FFB74D;
      --mdw-theme-palette--orange-400: #FFA726;
      --mdw-theme-palette--orange-500: #FF9800;
      --mdw-theme-palette--orange-600: #FB8C00;
      --mdw-theme-palette--orange-700: #F57C00;
      --mdw-theme-palette--orange-800: #EF6C00;
      --mdw-theme-palette--orange-900: #E65100;
      --mdw-theme-palette--orange-A100: #FFD180;
      --mdw-theme-palette--orange-A200: #FFAB40;
      --mdw-theme-palette--orange-A400: #FF9100;
      --mdw-theme-palette--orange-A700: #FF6D00;
      --mdw-theme-palette--orange--light: var(--mdw-theme-palette--orange-500);
      --mdw-theme-palette--orange--dark: var(--mdw-theme-palette--orange-200);

      /* deeporange */
      --mdw-theme-palette--deeporange-50: #FBE9E7;
      --mdw-theme-palette--deeporange-100: #FFCCBC;
      --mdw-theme-palette--deeporange-200: #FFAB91;
      --mdw-theme-palette--deeporange-300: #FF8A65;
      --mdw-theme-palette--deeporange-400: #FF7043;
      --mdw-theme-palette--deeporange-500: #FF5722;
      --mdw-theme-palette--deeporange-600: #F4511E;
      --mdw-theme-palette--deeporange-700: #E64A19;
      --mdw-theme-palette--deeporange-800: #D84315;
      --mdw-theme-palette--deeporange-900: #BF360C;
      --mdw-theme-palette--deeporange-A100: #FF9E80;
      --mdw-theme-palette--deeporange-A200: #FF6E40;
      --mdw-theme-palette--deeporange-A400: #FF3D00;
      --mdw-theme-palette--deeporange-A700: #DD2C00;
      --mdw-theme-palette--deeporange--light: var(--mdw-theme-palette--deeporange-500);
      --mdw-theme-palette--deeporange--dark: var(--mdw-theme-palette--deeporange-200);
    }
  `;
}
