import { candidates } from "@/shared/data";
import Head from "next/head";

const ActionButton = ({
  className,
  header,
  desc,
}: {
  index: number;
  className: string;
  header: string;
  desc?: string | boolean;
}) => {
  return (
    <button
      className={`gap-2 lg:gap-4 lg:text-xl rounded-lg p-6 w-full flex flex-col items-center justify-center ${className}`}
    >
      <b className="text-xl lg:text-3xl">{header}</b>
      {desc && <span>{desc}</span>}
    </button>
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
          {candidates.map((v, i) => (
            <ActionButton
              key={i}
              className={v.className}
              header={v.type === "vote" ? `หมายเลข ${i + 1}` : v.name}
              desc={v.type === "vote" && v.name}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
