import { Accessor, createSignal, onMount } from "solid-js";
import ResponseHeaders from "./ResponseHeaders";
import { ResponseInfo, getHeaders, sendEvent } from "../utils";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function withHttp(url: string) {
  return !/^https?:\/\//i.test(url) ? `https://${url}` : url;
}

function ResponseHeadersForm() {
  const [responseInfo, setResponseInfo] = createSignal<ResponseInfo>();
  const [error, setError] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);
  let inputElement: any;

  onMount(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const urlParam = params.get("url");

    if (urlParam) {
      processUrl(urlParam);
      inputElement.value = urlParam;
    }
  });

  async function processUrl(url: string) {
    if (!isValidUrl(url)) {
      setError("That's not a valid URL!");
      return setLoading(false);
    }

    sendEvent("get_headers", { url });

    try {
      const data = await getHeaders(url);
      setResponseInfo(data);
    } catch (e) {
      console.log(e);
      setError("Something went wrong!");
    }

    setLoading(false);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.target as HTMLFormElement;
    // @ts-ignore
    const url = withHttp(form.elements.url.value);

    window.history.pushState({}, "", `?url=${url}`);

    processUrl(url);
  }

  return (
    <div class="grid gap-6 max-w-xl mx-auto">
      <form class="px-2 md:px-6" onSubmit={handleSubmit}>
        <label class="mb-0.5 inline-block" for="url">
          Enter a URL
        </label>

        <div class="flex flex-col md:flex-row gap-2 w-auto">
          <input
            ref={inputElement}
            type="type"
            id="url"
            placeholder="https://picperf.io"
            class="flex-1"
            required={true}
          />
          <input type="submit" value="See Headers" />
        </div>

        {error() && <p class="text-red-500 mt-1">{error()}</p>}
      </form>

      {loading() && <p class="mt-8 text-center text-2xl">Loading...</p>}

      {responseInfo() && (
        <ResponseHeaders
          responseInfo={responseInfo as Accessor<ResponseInfo>}
        />
      )}
    </div>
  );
}

export default ResponseHeadersForm;
