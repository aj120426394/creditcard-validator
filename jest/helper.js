import React from 'react';
import enzyme from 'enzyme';
import { ThemeProvider } from 'styled-components';

/**
 * Wrapper for enzyme's mount() that includes the theme for styled-components
 */
export function mountWithTheme(children, theme, options = {}) {
  return enzyme.mount(children, buildRenderOptions(theme, options));
}

/**
 * Wrapper for enzyme's shallow() that includes the theme for styled-components
 */
export function shallowWithTheme(children, theme, options = {}) {
  return enzyme.shallow(children, buildRenderOptions(theme, options));
}

/**
 * Wrapper for enzyme's render() that includes the theme for styled-components
 */
export function renderWithTheme(children, theme, options = {}) {
  return enzyme.render(children, buildRenderOptions(theme, options));
}

let themeProvider;

function buildRenderOptions(theme, options = {}) {
  const { context, childContextTypes } = options;
  if (!themeProvider) {
    themeProvider = enzyme.mount(<ThemeProvider theme={theme} />, options).instance();
  }
  return {
    ...options,
    context: {
      ...context,
      ...themeProvider.getChildContext()
    },
    childContextTypes: {
      ...childContextTypes,
      ...themeProvider.constructor.childContextTypes
    }
  };
}
