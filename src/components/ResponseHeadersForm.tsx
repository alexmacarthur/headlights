import { createSignal } from "solid-js";
import ResponseHeaders from "./ResponseHeaders";

const API_URL = "https://macarthur-me-api.vercel.app/api";

export interface ResponseInfo {
  headers: Array<Array<string>>;
  status: number;
}

async function getHeaders(url: string): Promise<ResponseInfo> {
  const response = await fetch(`${API_URL}/headers?url=${url}`);
  const { headers, status } = await response.json();

  return {
    headers: Object.entries(headers),
    status,
  };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function ResponseHeadersForm() {
  const [responseInfo, setResponseInfo] = createSignal<ResponseInfo>(null);
  const [error, setError] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.target as HTMLFormElement;
    // @ts-ignore
    const url = form.elements.url.value;

    if (!isValidUrl(url)) {
      setError("That's not a valid URL!");
      return setLoading(false);
    }

    try {
      const data = await getHeaders(url);
      setResponseInfo(data);
    } catch (e) {
      console.log(e);
      setError("Something went wrong!");
    }

    setLoading(false);
  }

  return (
    <div class="grid gap-6 max-w-xl mx-auto">
      <form class="px-2 md:px-6" onSubmit={handleSubmit}>
        <label class="mb-0.5 inline-block" for="url">
          Enter a URL
        </label>

        <div class="flex flex-col md:flex-row gap-2 w-auto">
          <input
            type="type"
            id="url"
            placeholder="https://picperf.dev"
            class="flex-1"
          />
          <input type="submit" value="See Headers" />
        </div>

        {error() && <p class="text-red-500 mt-1">{error()}</p>}
      </form>

      {loading() && <p class="mt-8 text-center text-2xl">Loading...</p>}

      {responseInfo() && <ResponseHeaders responseInfo={responseInfo} />}
    </div>
  );
}

export default ResponseHeadersForm;
