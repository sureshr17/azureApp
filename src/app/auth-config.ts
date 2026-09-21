import { LogLevel, type Configuration, BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '71a5cd25-72e4-4a85-a7e8-aba6a19331cb',
    authority: 'https://login.microsoftonline.com/9e177c49-3944-482b-89e8-ae05b7a484f9',
    redirectUri: 'http://localhost:4200/dashboard',
    postLogoutRedirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        if (containsPii) {
          return;
        }

        switch (logLevel) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          default:
            break;
        }
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
};

export const protectedResources = {
  graph: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['User.Read'],
  },
};
