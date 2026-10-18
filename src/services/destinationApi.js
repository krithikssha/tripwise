
const API_URL = "https://en.wikipedia.org/w/api.php";

export function classifyDestination(place) {
  const text = [
    place.title,
    place.description,
    ...(place.categories || []),
  ]
    .join(" ")
    .toLowerCase();

  if (
    /national park|nature reserve|waterfall|mountain|mountains|lake|beach|island|forest|river|desert|glacier|wildlife/.test(
      text
    )
  ) {
    return "Nature";
  }

  if (
    /museum|heritage|historic|historical|culture|cultural|monument|temple|church|mosque|fort|palace/.test(
      text
    )
  ) {
    return "Culture";
  }

  if (
    /architecture|architectural|building|bridge|tower|cathedral|skyscraper/.test(
      text
    )
  ) {
    return "Architecture";
  }

  return "Attractions";
}

export async function fetchDestinations(searchTerm, signal) {
  const query = searchTerm.trim() || "tourist attractions in India";

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "0",
    gsrlimit: "12",
    prop: "pageimages|extracts|info|categories",
    piprop: "thumbnail",
    pithumbsize: "640",
    exintro: "1",
    explaintext: "1",
    exchars: "600",
    inprop: "url",
    cllimit: "20",
    format: "json",
    formatversion: "2",
    origin: "*",
  });

  const response = await fetch(
    `${API_URL}?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(
      "We couldn't load destinations. Please try again."
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      data.error.info || "The destination service returned an error."
    );
  }

  const pages = data.query?.pages || [];

  return pages
    .filter((page) => page.title && page.extract)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((page) => {
      const destination = {
        id: page.pageid,
        title: page.title,
        description: page.extract,
        image: page.thumbnail?.source || null,
        url:
          page.fullurl ||
          `https://en.wikipedia.org/wiki/${encodeURIComponent(
            page.title.replace(/ /g, "_")
          )}`,
        categories: (page.categories || []).map(
          (category) => category.title
        ),
      };

      return {
        ...destination,
        category: classifyDestination(destination),
      };
    });
}
