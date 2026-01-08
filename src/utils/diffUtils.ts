/**
 * Parse a URL into its components
 */
export interface URLComponent {
  name: string;
  value1: string;
  value2: string;
  isSame: boolean;
}

export function parseURLComponents(url1: string, url2: string): URLComponent[] {
  const components: URLComponent[] = [];

  try {
    const parsedUrl1 = new URL(url1);
    const parsedUrl2 = new URL(url2);

    // Protocol
    const protocol1 = parsedUrl1.protocol.replace(":", "");
    const protocol2 = parsedUrl2.protocol.replace(":", "");
    components.push({
      name: "protocol",
      value1: protocol1,
      value2: protocol2,
      isSame: protocol1 === protocol2,
    });

    // Host
    const host1 = parsedUrl1.host;
    const host2 = parsedUrl2.host;
    components.push({
      name: "host",
      value1: host1,
      value2: host2,
      isSame: host1 === host2,
    });

    // Pathname
    const pathname1 = parsedUrl1.pathname;
    const pathname2 = parsedUrl2.pathname;
    components.push({
      name: "pathname",
      value1: pathname1,
      value2: pathname2,
      isSame: pathname1 === pathname2,
    });

    // Query parameters
    const params1 = new URLSearchParams(parsedUrl1.search);
    const params2 = new URLSearchParams(parsedUrl2.search);

    // Get all unique parameter names
    const allParamNames = new Set<string>();
    params1.forEach((_, key) => allParamNames.add(key));
    params2.forEach((_, key) => allParamNames.add(key));

    // Add parameters to components
    Array.from(allParamNames)
      .sort()
      .forEach((paramName) => {
        const value1 = params1.get(paramName) || "";
        const value2 = params2.get(paramName) || "";
        const isSame = !!(value1 && value2 && value1 === value2);
        components.push({
          name: `Query Param: ${paramName}`,
          value1,
          value2,
          isSame,
        });
      });

    return components;
  } catch (e) {
    console.error("Invalid URL:", e);
    return [];
  }
}

/**
 * Split a URL by & and return segments with line breaks for easier reading
 */
export function urlSegments(url: string): string[] {
  return url.split("&");
}
