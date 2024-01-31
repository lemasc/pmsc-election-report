import { useHistory, useMutation, useStorage } from "@/liveblocks.config";
import { CandidateData, candidates, CandidateSnapshot } from "@/shared/data";
import { setVote, undoVote } from "@/shared/report";
import { useDocument, isDocumentValid } from "@lemasc/swr-firestore";
import Head from "next/head";
import { useCallback, useMemo } from "react";

type ActionButtonProps = {
  className: string;
  header: string;
  desc?: string | boolean;
  children?: React.ReactNode | React.ReactNode[];
};
const ActionButton = ({
  className,
  header,
  desc,
  children,
  onClick,
}: ActionButtonProps & {
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`gap-2 lg:gap-4 lg:text-xl rounded-lg p-6 w-full flex flex-col items-center justify-center ${className}`}
    >
      <b className="text-xl lg:text-3xl">{header}</b>
      {desc && <span>{desc}</span>}
      {children}
    </button>
  );
};

const VoteButton = ({
  value,
  index,
  ...props
}: ActionButtonProps & {
  value: number;
  index: string;
}) => {
  const onClick = useMutation(
    ({ storage }) => {
      const map = storage.get("votes");
      map.set(index, value + 1);
    },
    [index, value]
  );
  return (
    <ActionButton {...props} onClick={onClick}>
      <b>{value} คะแนน</b>
    </ActionButton>
  );
};

const UndoButton = ({ data, loaded }: { data: CandidateData, loaded: boolean }) => {
  const history = useHistory();
  const onClick = useCallback(() => {
    if (loaded) history.undo();
  }, [loaded, history]);
  return (
    <ActionButton
      onClick={onClick}
      header={loaded ? data.name : "กำลังโหลด..."}
      className={data.className}
    />
  );
};
export default function ReportPage() {
  const votes = useStorage((v) => v.votes);
  return (
    <>
      <Head>
        <title>ระบบรายงานคะแนนการเลือกตั้ง - PM SC Election</title>
      </Head>
      <div className="flex flex-col w-full h-full min-h-screen py-6 px-6 bg-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {candidates.map((v, i) =>
            v.type === "undo" ? (
              <UndoButton key={i} data={v} loaded={!!votes} />
            ) : (
              <VoteButton
                key={i}
                className={v.className}
                header={v.type === "vote" ? `หมายเลข ${i + 1}` : v.name}
                desc={v.type === "vote" && v.name}
                index={i.toString()}
                value={votes?.get(i.toString()) ?? 0}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
