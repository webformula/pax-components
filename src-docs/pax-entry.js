
import './components/anchor-link.js';
import './components/monaco-editor.js';

import { router } from '@webformula/pax-core';
import Autocomplete from './pages/components/autocomplete.js';
import Backdrop from './pages/components/backdrop.js';
import Banners from './pages/components/banners.js';
import BottomNavigation from './pages/components/bottom-navigation.js';
import Buttons from './pages/components/buttons.js';
import Cards from './pages/components/cards.js';
import Checkboxes from './pages/components/checkboxes.js';
import CircularProgress from './pages/components/circular-progress.js';
import DatePicker from './pages/components/date-picker.js';
import Dialog from './pages/components/dialog.js';
import Drawers from './pages/components/drawers.js';
import FAB from './pages/components/fab.js';
import LinearProgress from './pages/components/linear-progress.js';
import List from './pages/components/lists.js';
import Menu from './pages/components/menu.js';
import Panel from './pages/components/panel.js';
import Radio from './pages/components/radio.js';
import Selects from './pages/components/select.js';
import SheetsSide from './pages/components/sheets-side.js';
import Sheets from './pages/components/sheets.js';
import Slider from './pages/components/slider.js';
import Snackbar from './pages/components/snackbar.js';
import Switch from './pages/components/switch.js';
import Tabs from './pages/components/tabs.js';
import Textfield from './pages/components/text-field.js';
import TopAppBar from './pages/components/top-app-bar.js';
import Browsers from './pages/documentation/browsers.js';
import Density from './pages/documentation/density.js';
import Install from './pages/documentation/install.js';
import Layout from './pages/documentation/layout.js';
import Mobile from './pages/documentation/mobile.js';
import ThemePage from './pages/documentation/theme.js';
import Home from './pages/home.js';

router.addPageClass(Autocomplete, 'components/autocomplete');
router.addPageClass(Backdrop, 'components/backdrop');
router.addPageClass(Banners, 'components/banners');
router.addPageClass(BottomNavigation, 'components/bottom-navigation');
router.addPageClass(Buttons, 'components/buttons');
router.addPageClass(Cards, 'components/cards');
router.addPageClass(Checkboxes, 'components/checkboxes');
router.addPageClass(CircularProgress, 'components/circular-progress');
router.addPageClass(DatePicker, 'components/date-picker');
router.addPageClass(Dialog, 'components/dialog');
router.addPageClass(Drawers, 'components/drawers');
router.addPageClass(FAB, 'components/fab');
router.addPageClass(LinearProgress, 'components/linear-progress');
router.addPageClass(List, 'components/lists');
router.addPageClass(Menu, 'components/menu');
router.addPageClass(Panel, 'components/panel');
router.addPageClass(Radio, 'components/radio');
router.addPageClass(Selects, 'components/select');
router.addPageClass(SheetsSide, 'components/sheets-side');
router.addPageClass(Sheets, 'components/sheets');
router.addPageClass(Slider, 'components/slider');
router.addPageClass(Snackbar, 'components/snackbar');
router.addPageClass(Switch, 'components/switch');
router.addPageClass(Tabs, 'components/tabs');
router.addPageClass(Textfield, 'components/text-field');
router.addPageClass(TopAppBar, 'components/top-app-bar');
router.addPageClass(Browsers, 'documentation/browsers');
router.addPageClass(Density, 'documentation/density');
router.addPageClass(Install, 'documentation/install');
router.addPageClass(Layout, 'documentation/layout');
router.addPageClass(Mobile, 'documentation/mobile');
router.addPageClass(ThemePage, 'documentation/theme');
router.addPageClass(Home, 'home');
router.setRoot('home');
router.init();
window.router = router;

export {
  router
}
  