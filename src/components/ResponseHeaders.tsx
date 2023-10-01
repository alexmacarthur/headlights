import { Accessor, For } from "solid-js";
import { ResponseInfo } from "./ResponseHeadersForm";

function ResponseHeaders({
  responseInfo,
}: {
  responseInfo: Accessor<ResponseInfo>;
}) {
  const { headers, status } = responseInfo();

  return (
    <div class="list-none p-0 pt-6">
      <h3 class="text-center text-xl mb-12 max-w-md mx-auto">
        Response came back with a{" "}
        <span class="text-teal-600 font-bold">{status}</span> status code and
        the following headers:
      </h3>

      <ul>
        <li class="sm:grid-cols-[1fr_2fr] border-b hidden sm:grid">
          <div class="p-3 md:p-6 text-xl font-bold">Name</div>
          <div class="p-3 md:p-6 text-xl font-bold">Value</div>
        </li>

        <For each={headers}>
          {([name, value]) => (
            <li class="grid sm:grid-cols-[1fr_2fr] border-b py-3 ms:py-0">
              <div class="p-3 md:p-6 break-all font-bold sm:font-normal">
                {name}
              </div>
              <div class="p-3 md:p-6 break-all">{value}</div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default ResponseHeaders;
