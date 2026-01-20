import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration
 * Customizes the design tokens to match your brand
 *
 * @see https://ant.design/docs/react/customize-theme
 */
export const antdTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Font
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,

    // Control height
    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 28,

    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
    },
    Input: {
      activeBorderColor: '#1677ff',
      hoverBorderColor: '#4096ff',
    },
    Card: {
      headerBg: 'transparent',
    },
    Table: {
      headerBg: '#fafafa',
    },
    Menu: {
      itemBg: 'transparent',
    },
  },
};

/**
 * Dark theme configuration
 */
export const antdDarkTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    // Override for dark mode
    colorBgContainer: '#141414',
    colorBgElevated: '#1f1f1f',
    colorBgLayout: '#000000',
    colorBorderSecondary: '#303030',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
  },
};
