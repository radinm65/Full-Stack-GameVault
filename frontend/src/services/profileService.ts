import type IProfileData from "../core/interfaces/models/profile/IProfile";
import type { IProfileEdits } from "../core/interfaces/models/profile/IProfile";
import { dummyLibrary } from "./libraryService";

// ! DUMMY DATA: replace with GET /api/profiles/:handle (the signed-in user's own profile when no handle
// ! is given, e.g. GET /api/profile). The server decides `isOwn`, the client never works it out.

// ! DUMMY DATA: the signed-in user
const OWN_HANDLE = "novastrider";

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ! Replace with PATCH /api/users/me { displayName, bio, avatar, cover }. The images are uploaded first (the
// ! request sends their URLs) and the server validates the same rules as the form, a rejected value comes
// ! back as a field error to show under that field.
export async function updateProfile(edits: IProfileEdits): Promise<void> {
  void edits;
}

// `handle` is empty for the signed-in user's own profile (/profile) and holds the player's handle
// for someone else's (/profile/kaiplays)
export async function getProfile(handle: string): Promise<IProfileData> {
  const isOwn = handle === "" || handle === OWN_HANDLE;
  const profileHandle = isOwn ? OWN_HANDLE : handle;
  const name = isOwn ? "Nova Strider" : capitalize(profileHandle);

  // The favorite games are library games, picked by their ids (Cyberpunk, Spider-Man, Forza)
  const favorites = [2, 1, 3]
    .map((gameId) => dummyLibrary.find((game) => game.id === gameId))
    .filter((game) => game !== undefined);

  return {
    profile: {
      handle: profileHandle,
      name,
      initial: name.charAt(0),
      joinedAt: "March 2026",
      bio: "Chasing hidden paths, difficult bosses and one more run. Usually lost in an open world. Always up for talking indie games.",
      banner: "/images/Community/hollow-knight-banner.png",
      friends: 24,
      following: 38,
      followers: 52,
      isOwn,
    },
    achievements: [
      {
        id: 1,
        icon: "trophy",
        title: "King of Swing",
        game: "Spider-Man Remastered",
        detail: "Traversal challenges · Today",
      },
      {
        id: 2,
        icon: "sparkle",
        title: "Completionist",
        game: "Ori and the Will of the Wisps",
        detail: "37 / 37 unlocked · Yesterday",
      },
      {
        id: 3,
        icon: "swords",
        title: "The Hollow Knight",
        game: "Hollow Knight",
        detail: "Defeat the Hollow Knight · Oct 7",
      },
    ],
    favorites,
    activities: [
      { id: 1, title: "Started playing Cyberpunk 2077", detail: "Playing now · PC · 2 hours ago" },
      { id: 2, title: "Unlocked \"King of Swing\"", detail: "Spider-Man Remastered · Today" },
      { id: 3, title: "Completed Ori and the Will of the Wisps", detail: "37 / 37 achievements · Yesterday" },
      { id: 4, title: "Reviewed Hollow Knight", detail: "\"Worth every attempt.\" · Oct 7" },
      { id: 5, title: "Added Forza Horizon 5 to Weekend Comfort", detail: "Collection · Oct 3" },
    ],
  };
}
