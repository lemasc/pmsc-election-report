import { doc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

type VoteReportStore = {
  recentVote?: {
    id: string;
    value: number;
  };
};

export const voteReportStore = create<VoteReportStore>(() => ({
  recentVote: undefined,
}));

export const setVote = async (id: string, value: number) => {
  // set the vote in the votes collection
  await setDoc(
    doc(db, "votes", id.toString()),
    { value, lastUpdated: new Date() },
    {
      merge: true,
    }
  );
  // set the vote in the recent store
  voteReportStore.setState({ recentVote: { id, value } });
};

export const undoVote = async () => {
  const { recentVote } = voteReportStore.getState();
  if (recentVote) {
    const { id, value } = recentVote;
    // undo vote
    await setVote(id, value - 1);
    voteReportStore.setState({ recentVote: undefined });
  }
};
