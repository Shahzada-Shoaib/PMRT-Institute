import googleServices from '../../google-services.json';

type GoogleOAuthClient = {
  client_id?: string;
  client_type?: number;
};

type GoogleServicesClient = {
  oauth_client?: GoogleOAuthClient[];
  services?: {
    appinvite_service?: {
      other_platform_oauth_client?: GoogleOAuthClient[];
    };
  };
};

function findWebClientId(clients: GoogleOAuthClient[] | undefined) {
  return clients?.find((client) => client.client_type === 3)?.client_id ?? '';
}

export function getGoogleWebClientId() {
  const appClients = (googleServices.client ?? []) as GoogleServicesClient[];

  for (const client of appClients) {
    const fromOauth = findWebClientId(client.oauth_client);
    if (fromOauth) {
      return fromOauth;
    }

    const fromOtherPlatform = findWebClientId(
      client.services?.appinvite_service?.other_platform_oauth_client,
    );
    if (fromOtherPlatform) {
      return fromOtherPlatform;
    }
  }

  return process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '';
}
