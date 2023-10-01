interface EventProps {
  [key: string]: string | number | boolean;
}

declare global {
  interface Window {
    plausible: (eventName: string, eventProps: { props: EventProps }) => void;
  }
}

const API_URL = "https://macarthur-me-api.vercel.app/api";

export interface ResponseInfo {
  headers: Array<Array<string>>;
  status: number;
}

export async function getHeaders(url: string): Promise<ResponseInfo> {
  const response = await fetch(`${API_URL}/headers?url=${url}`);
  const { headers, status } = await response.json();

  return {
    headers: Object.entries(headers),
    status,
  };
}

export function sendEvent(eventName: string, eventProps: EventProps = {}) {
  eventProps.path = window.location.pathname;

  if (!window.plausible || import.meta.env.NODE_ENV === "development") {
    return console.log({
      event_name: eventName,
      event_data: eventProps,
    });
  }

  window.plausible(eventName, {
    props: eventProps,
  });
}
