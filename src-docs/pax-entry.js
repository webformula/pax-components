
import './components/anchor-link.js';
import './components/monaco-editor.js';

import { router } from '@webformula/pax-core';
import TopAppBar from './pages/components/app-bar-top.js';
import Autocomplete from './pages/components/autocomplete.js';
import Backdrop from './pages/components/backdrop.js';
import Banners from './pages/components/banners.js';
import BottomNavigation from './pages/components/bottom-navigation.js';
import Buttons from './pages/components/buttons.js';
import Cards from './pages/components/cards.js';
import Checkboxes from './pages/components/checkboxes.js';
import Dialog from './pages/components/dialog.js';
import FAB from './pages/components/fab.js';
import List from './pages/components/lists.js';
import Menu from './pages/components/menu.js';
import Drawers from './pages/components/navigation-drawers.js';
import NavigationRail from './pages/components/navigation-rail.js';
import Panel from './pages/components/panel.js';
import CircularProgress from './pages/components/progress-circular.js';
import LinearProgress from './pages/components/progress-linear.js';
import Radio from './pages/components/radio.js';
import Select from './pages/components/select.js';
import SheetsBottom from './pages/components/sheet-bottom.js';
import SheetsSide from './pages/components/sheet-side.js';
import Slider from './pages/components/slider.js';
import Snackbar from './pages/components/snackbar.js';
import Surface from './pages/components/surface.js';
import Switch from './pages/components/switch.js';
import Tabs from './pages/components/tabs.js';
import Templates from './pages/components/templates.js';
import Textfield from './pages/components/text-field.js';
import Browsers from './pages/documentation/browsers.js';
import Density from './pages/documentation/density/page.js';
import Install from './pages/documentation/install.js';
import Layout from './pages/documentation/layout/page.js';
import Mobile from './pages/documentation/mobile.js';
import PageLayout from './pages/documentation/page-layout/page.js';
import ThemePage from './pages/documentation/theming/page.js';
import Home from './pages/home.js';

router.addPageClass(TopAppBar, 'components/app-bar-top');
router.addPageClass(Autocomplete, 'components/autocomplete');
router.addPageClass(Backdrop, 'components/backdrop');
router.addPageClass(Banners, 'components/banners');
router.addPageClass(BottomNavigation, 'components/bottom-navigation');
router.addPageClass(Buttons, 'components/buttons');
router.addPageClass(Cards, 'components/cards');
router.addPageClass(Checkboxes, 'components/checkboxes');
router.addPageClass(Dialog, 'components/dialog');
router.addPageClass(FAB, 'components/fab');
router.addPageClass(List, 'components/lists');
router.addPageClass(Menu, 'components/menu');
router.addPageClass(Drawers, 'components/navigation-drawers');
router.addPageClass(NavigationRail, 'components/navigation-rail');
router.addPageClass(Panel, 'components/panel');
router.addPageClass(CircularProgress, 'components/progress-circular');
router.addPageClass(LinearProgress, 'components/progress-linear');
router.addPageClass(Radio, 'components/radio');
router.addPageClass(Select, 'components/select');
router.addPageClass(SheetsBottom, 'components/sheet-bottom');
router.addPageClass(SheetsSide, 'components/sheet-side');
router.addPageClass(Slider, 'components/slider');
router.addPageClass(Snackbar, 'components/snackbar');
router.addPageClass(Surface, 'components/surface');
router.addPageClass(Switch, 'components/switch');
router.addPageClass(Tabs, 'components/tabs');
router.addPageClass(Templates, 'components/templates');
router.addPageClass(Textfield, 'components/text-field');
router.addPageClass(Browsers, 'documentation/browsers');
router.addPageClass(Density, 'documentation/density/page');
router.addPageClass(Install, 'documentation/install');
router.addPageClass(Layout, 'documentation/layout/page');
router.addPageClass(Mobile, 'documentation/mobile');
router.addPageClass(PageLayout, 'documentation/page-layout/page');
router.addPageClass(ThemePage, 'documentation/theming/page');
router.addPageClass(Home, 'home');
router.setRoot('home');
router.init();
window.router = router;

export {
  router
}
  