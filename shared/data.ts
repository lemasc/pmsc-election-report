type CandidateData = {
  name: string;
  className: string;
  type: "vote" | "no-vote" | "invalid" | "undo";
};

const candidates: CandidateData[] = [
  {
    name: "เณวิสาข์ ไทรสาขา",
    type: "vote",
    className: "bg-[#E34C51] text-white",
  },
  {
    name: "บุญญาดา จันทรสิทธิ์",
    type: "vote",
    className: "bg-[#00B3FF] text-white",
  },
  {
    name: "ธัญชนก ภัคกรณ์กุล",
    type: "vote",
    className: "bg-[#B975F6] text-white",
  },
  {
    name: "ไม่ประสงค์ลงคะแนน",
    type: "no-vote",
    className: "bg-gray-300",
  },
  {
    name: "งดออกเสียง",
    type: "invalid",
    className: "bg-orange-500",
  },
  {
    name: "ยกเลิก",
    type: "undo",
    className: "disabled:bg-zinc-800 bg-gray-500",
  },
];

export { candidates };
export type { CandidateData };
