import { useEffect, useRef, useState } from "react";

// A text input that shows every keystroke right away, but only tells the page (and so the URL and
// the API) after the user stops typing for `delay` milliseconds.
//
//   const [searchText, setSearchText] = useDelayedInput(filters.q, (text) => setFilter("q", text));
//   <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
//
// Parameters:
//  - urlValue: the value that currently lives in the URL (filters.q)
//  - onDelayedChange: called with the text once typing pauses
//  - delay: how long to wait after the last keystroke
//
// How it works:
//  - text is what the input shows. It changes on every keystroke.
//  - Every keystroke cancels the running timer and starts a new one. When the timer finishes,
//    the text is sent to onDelayedChange.
//  - lastSentText remembers what we sent. When urlValue changes to something we did NOT send
//    (the user clicked "Clear filters", or opened a link with ?q=...), the input shows the new
//    urlValue instead. When urlValue changed because of our own send, nothing happens, so text
//    typed in the meantime is not overwritten.
export default function useDelayedInput(
  urlValue: string,
  onDelayedChange: (text: string) => void,
  delay = 1000,
): [string, (text: string) => void] {
  const [text, setText] = useState(urlValue);
  const lastSentText = useRef(urlValue);
  const timer = useRef<number | undefined>(undefined);

  function handleTyping(newText: string) {
    setText(newText);

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      lastSentText.current = newText;
      onDelayedChange(newText);
    }, delay);
  }

  // The URL changed from outside: show the new value and drop any text that was waiting to be sent
  useEffect(() => {
    if (urlValue === lastSentText.current) return;

    window.clearTimeout(timer.current);
    lastSentText.current = urlValue;
    setText(urlValue);
  }, [urlValue]);

  // Leaving the page cancels a send that has not happened yet
  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  return [text, handleTyping];
}
