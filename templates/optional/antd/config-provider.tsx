import { ConfigProvider, App as AntdApp, theme as antdThemeAlgorithm } from 'antd';
import { useTheme } from '~/providers/theme-provider';
import { antdTheme, antdDarkTheme } from './theme';

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

/**
 * Ant Design ConfigProvider wrapper
 * Provides theme configuration and integrates with the app's theme system
 *
 * Uses the AntdApp wrapper which provides:
 * - Static methods for message, notification, modal
 * - Consistent styling context
 */
export function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <ConfigProvider
      theme={{
        ...(isDark ? antdDarkTheme : antdTheme),
        algorithm: isDark
          ? antdThemeAlgorithm.darkAlgorithm
          : antdThemeAlgorithm.defaultAlgorithm,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
