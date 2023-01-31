import banner from "../public/banner.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { candidates as data, CandidateSnapshot } from "@/shared/data";
import { useCollection } from "@lemasc/swr-firestore";

import { db } from "../shared/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

const candidates = data.slice(0, 3);
const Footer = () => {
  const [data, setData] = useState<CandidateSnapshot[]>([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "votes"), ({ docs }) => {
        setData(
          docs.reduce((data, doc) => {
            const docId = parseInt(doc.id);
            if (!isNaN(docId)) {
              data[docId] = doc.data() as CandidateSnapshot;
            }
            return data;
          }, [] as CandidateSnapshot[])
        );
      }),
    []
  );

  return (
    <div className="absolute bottom-0 flex w-full" style={{ zoom: 1.5 }}>
      <div className="flex-grow grid grid-cols-3">
        {candidates.map((v, i) => (
          <div
            className={` flex flex-wrap gap-4 py-4 px-6 ${v.className} `}
            key={i}
          >
            <div className="relative w-[120px]">
              <Image
                unoptimized
                width={120}
                height={120}
                src={`/candidates/${i + 1}.jpg`}
                className="rounded shadow-md absolute bottom-0 z-10"
                alt={v.name}
              />
            </div>
            <div className={`flex flex-col gap-0.5 pb-1`}>
              <b className="text-lg text-white">
                {i + 1}. {v.name}
              </b>
              <span className="text-gray-200">
                {data?.[i]?.value || 0} คะแนน
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function IndexPage() {
  const { query } = useRouter();
  return (
    <div className="bg-green-500 w-[1920px] h-[1080px]">
      <div style={{ zoom: 0.5 }}>
        <Image src={banner} alt="Banner" width={1920} height={1080} />
      </div>
      {!query.hideFooter && <Footer />}
    </div>
  );
}
