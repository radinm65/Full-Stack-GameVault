import { useEffect, useState } from "react";


export default function useLoadData<T>(
  loadData: (queryString: string) => Promise<T>,
  queryString = "",
) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let isOutdated = false;

    loadData(queryString).then((newData) => {
      if (!isOutdated) setData(newData);
    });

    // Runs when queryString changes or the page closes: from now on this request is old news
    return () => {
      isOutdated = true;
    };
  }, [loadData, queryString]);

  return data;
}
