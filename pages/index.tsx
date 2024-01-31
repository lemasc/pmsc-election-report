import Image from "next/image";
import { useRouter } from "next/router";
import { candidates as data, CandidateSnapshot } from "@/shared/data";

import { useEffect, useMemo, useState } from "react";
import { useStorage } from "@/liveblocks.config";

const candidates = data.slice(0, -1).filter((v) => v.type !== "invalid");
const invalid = data.findIndex((v) => v.type === "invalid");
console.log(invalid);

const Footer = () => {
  const votes = useStorage((v) => v.votes);
  const validVotes = useMemo(
    () =>
      candidates.reduce((a, v, i) => a + (votes?.get(i.toString()) || 0), 0),
    [votes]
  );
  const invalidVotes = useMemo(
    () => votes?.get(invalid.toString()) || 0,
    [votes]
  );

  return (
    <>
      <div className="w-[600px] absolute h-full min-h-screen top-0 left-0 flex flex-col bg-white bg-opacity-70 pt-6 text-xl z-10">
        <div className="h-[200px] flex flex-row p-6 gap-4 items-center ">
          <div>
            <Image src="/logo_wpm.png" width={80} height={80} alt="Logo WPM" />
          </div>
          <div className="flex flex-col gap-1">
            <b className="text-3xl pr-4">การเลือกตั้งประธานนักเรียน</b>
            <span className="text-xl">ประจำปีการศึกษา 2567</span>
          </div>
        </div>
        <div className="text-center text-xl py-4 font-bold rounded-t-lg bg-gradient-to-r from-pink-400 to-yellow-300">
          ผลการนับคะแนนอย่างไม่เป็นทางการ
        </div>
        <div className="flex flex-col flex-grow">
          {candidates.map((v, i) => (
            <div
              className={`flex flex-col relative flex-wrap ${v.className} `}
              key={i}
            >
              <div className="flex gap-6 items-center pt-6 pb-3 px-6">
                <b className="text-7xl">{v.type === "vote" ? i + 1 : "X"}</b>
                <div className="flex-grow flex flex-col">
                  <span className="font-bold text-3xl">
                    {v.name.split(" ")[0]}
                  </span>
                  <span className="text-xl">{v.name.split(" ")[1]}</span>
                </div>
              </div>

              {v.type === "vote" && (
                <div className="absolute p-4 bottom-0 right-0">
                  <Image
                    width={120}
                    height={120}
                    src={`/candidates/${i + 1}.jpg`}
                    className="rounded shadow-md border-[3px] border-white"
                    alt={v.name}
                  />
                </div>
              )}
              <div>
                <div
                  className={`flex gap-2 py-3 px-6 ${
                    v.type === "invalid"
                      ? "bg-white bg-opacity-[0.15]"
                      : "bg-black bg-opacity-10"
                  } text-xl`}
                >
                  <span className="opacity-90">
                    {votes?.get(i.toString()) || 0}
                  </span>
                  <span>คะแนน</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-grow flex-col gap-2 px-4 pt-6 bg-gradient-to-b from-white to-gray-300">
            <div className="flex gap-4">
              <b className="text-blue-500 flex-grow">บัตรดี</b>
              <span>{validVotes} ใบ</span>
            </div>
            <div className="flex gap-4">
              <b className="text-red-500 flex-grow">บัตรเสีย</b>
              <span>{invalidVotes} ใบ</span>
            </div>
            <div className="flex gap-4">
              <b className="flex-grow">รวมผู้ใช้สิทธิ์ลงคะแนน</b>
              <span>{validVotes + invalidVotes} ใบ</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0">
        <Image
          src="/bg2.jpg"
          width={1920}
          height={1080}
          alt="Background"
          className="object-cover h-[250px] w-[600px] object-[100%_50%]"
        />
      </div>
    </>
  );
};
export default function IndexPage() {
  return (
    <div className="bg-[#00ff01] h-full min-h-screen">
      <Footer />
    </div>
  );
}
