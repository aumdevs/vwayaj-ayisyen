/** @vitest-environment jsdom */

import { createElement } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PwaUpdatePrompt } from "@/components/pwa/pwa-update-prompt";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("PWA update prompt lifecycle", () => {
  it("ignores a service-worker lookup that completes after unmount", async () => {
    let resolveRegistration: ((value: ServiceWorkerRegistration) => void) | undefined;
    const registration = {
      waiting: { postMessage: vi.fn() }
    } as unknown as ServiceWorkerRegistration;
    const serviceWorker = {
      addEventListener: vi.fn(),
      getRegistration: vi.fn(
        () =>
          new Promise<ServiceWorkerRegistration>((resolve) => {
            resolveRegistration = resolve;
          })
      ),
      removeEventListener: vi.fn()
    };
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: serviceWorker
    });
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const view = render(createElement(PwaUpdatePrompt, { locale: "ht" }));
    view.unmount();
    await act(async () => {
      resolveRegistration?.(registration);
      await Promise.resolve();
    });

    expect(serviceWorker.getRegistration).toHaveBeenCalledWith("/");
    expect(consoleError).not.toHaveBeenCalled();
  });
});
