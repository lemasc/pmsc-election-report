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
  type,
  index,
  ...props
}: ActionButtonProps & {
  index: number;
  type: Omit<CandidateData["type"], "undo">;
}) => {
  const docId = useMemo(
    () => (type === "vote" ? index.toString() : type),
    [type, index]
  );
  const { data } = useDocument<CandidateSnapshot>(`votes/${docId}`, {
    listen: true,
  });
  const value = useMemo(
    () => (data && isDocumentValid(data) && data.value) || 0,
    [data]
  );
  const onClick = useCallback(async () => {
    try {
      await setVote(docId as string, value + 1);
    } catch (err) {
      console.error(err);
    }
  }, [docId, value]);
  return (
    <ActionButton {...props} onClick={onClick}>
      <b>{value} คะแนน</b>
    </ActionButton>
  );
};

const UndoButton = ({ data }: { data: CandidateData }) => {
  const onClick = useCallback(() => {
    try {
      undoVote();
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <ActionButton
      onClick={onClick}
      header={data.name}
      className={data.className}
    />
  );
};
export default function ReportPage() {
  return (
    <>
      <Head>
        <title>ระบบรายงานคะแนนการเลือกตั้ง - PM SC Election</title>
      </Head>
      <div className="flex flex-col w-full h-full min-h-screen py-6 px-6 bg-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {candidates.map((v, i) =>
            v.type === "undo" ? (
              <UndoButton key={i} data={v} />
            ) : (
              <VoteButton
                key={i}
                className={v.className}
                header={v.type === "vote" ? `หมายเลข ${i + 1}` : v.name}
                desc={v.type === "vote" && v.name}
                index={i}
                type={v.type}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
