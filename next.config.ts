import { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const basePath = '/real-estate-landing';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isDev ? '' : basePath,
  assetPrefix: isDev ? '' : basePath,
  // Ensure CSS modules and assets work with the base path
  webpack: (config) => {
    if (!isDev) {
      config.output = config.output || {};
      config.output.publicPath = `${basePath}/`;

      // Ensure CSS files are handled correctly
      const rules = config.module?.rules || [];
      interface Loader {
        loader?: string;
        options?: {
          modules?: {
        [key: string]: any;
        getLocalIdent?: (context: any, localIdentName: string, localName: string) => string;
          };
        };
      }

      interface CssRule {
        test?: RegExp;
        use?: Loader[];
        [key: string]: any;
      }

      const cssRule: CssRule | undefined = (rules as CssRule[]).find(
        (rule: CssRule) => rule.test?.toString().includes('css')
      );
      if (cssRule && typeof cssRule === 'object') {
        cssRule.use = cssRule.use || [];
        cssRule.use.forEach((loader: any) => {
          if (loader?.options?.modules) {
            loader.options.modules = {
              ...loader.options.modules,
              // Add basePath to CSS module paths
              getLocalIdent: (context: any, _: any, localName: string) => {
                return `${basePath.replace('/', '')}_${localName}`;
              }
            };
          }
        });
      }
    }
    return config;
  },
} as NextConfig;

export default nextConfig;
