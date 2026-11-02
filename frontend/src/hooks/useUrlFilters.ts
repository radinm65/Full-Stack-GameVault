import { useSearchParams } from "react-router";


export default function useUrlFilters(defaults: Record<string, string>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Record<string, string> = {};
  for (const name of Object.keys(defaults)) {
    filters[name] = searchParams.get(name) ?? defaults[name];
  }

  function setFilter(name: string, value: string) {
    // Passing a function gives us the latest URL, so two quick changes cannot overwrite each other
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (value === defaults[name]) nextParams.delete(name);
        else nextParams.set(name, value);

        // Any filter change can leave the current page number out of range, so go back to page 1.
        // Changing the page itself must not do that.
        if (name !== "page") nextParams.delete("page");

        return nextParams;
      },
      // replace: true changes the current history entry instead of adding one. Otherwise every
      // filter click would add an entry and the back button would walk through all of them.
      { replace: true },
    );
  }

  function clearFilters(keep: string[] = []) {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams();

        // "tab" tells Games.tsx which tab is open, removing it would switch tabs
        for (const name of ["tab", ...keep]) {
          const value = currentParams.get(name);
          if (value !== null) nextParams.set(name, value);
        }

        return nextParams;
      },
      { replace: true },
    );
  }

  // Only the page's own filters go into the query string for the data hooks. Other parameters of the
  // URL (tab, game, wishlist) are left out, so opening a game modal does not reload the list.
  const ownParams = new URLSearchParams();
  for (const name of Object.keys(defaults)) {
    const value = searchParams.get(name);
    if (value !== null) ownParams.set(name, value);
  }

  return { filters, queryString: ownParams.toString(), setFilter, clearFilters };
}
