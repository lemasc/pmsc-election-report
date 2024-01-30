type CandidateSnapshot = {
  value: number;
  lastUpdated: Date;
};

type CandidateData = {
  name: string;
  className: string;
  type: "vote" | "no-vote" | "invalid" | "undo";
};

const candidates = [
  {
    name: "ปรัชญาณี ผลแก้ว",
    type: "vote",
    className: "bg-[#c3454e] text-white",
  },
  {
    name: "ณัฐณิชา วิธูรัตน์",
    type: "vote",
    className: "bg-[#c35dc0] text-white",
  },
  {
    name: "ธีระเศรษฐ์ พิมลวิรัชกุล",
    type: "vote",
    className: "bg-[#23518d] text-white",
  },
  {
    name: "ไม่ประสงค์ลงคะแนน",
    type: "no-vote",
    className: "bg-gray-300",
  },
  {
    name: "งดออกเสียง",
    type: "invalid",
    className: "bg-black text-white",
  },
  {
    name: "ยกเลิก",
    type: "undo",
    className: "bg-zinc-800 text-white",
  },
] satisfies CandidateData[];

export { candidates };
export type { CandidateData, CandidateSnapshot };
