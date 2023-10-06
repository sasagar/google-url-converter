"use client";

import { useState, useRef } from "react";

import FluentConvertRange24Regular from "./components/convert";
import MaterialSymbolsContentCopyOutline from "./components/copy";

export default function Home() {
  const fromURL = useRef(null);
  const toURL = useRef(null);
  const [disable, setDisable] = useState(true);

  const handler = () => {
    const from = fromURL.current.value;
    toURL.current.value = '';

    try {
      if (!from.match(/^https:\/\/drive\.google\.com/)) {
        throw Error("Not A Google Drive URL.");
      }
      const newFrom = from.replace(/file\/d\//, 'uc?id=').replace(/\/view.*/, '');

      toURL.current.value = newFrom;
      setDisable(false);
    } catch (err) {
      setDisable(true);
      toURL.current.value = "URLの形式が正しくないようです。もう一度確認して下さい。";
    }
  }
  const copyHandler = () => {
    try {
      navigator.clipboard.writeText(toURL.current.value);
      alert("コピーしました！");
    } catch (err) {
      console.error(err);
      alert("正しくコピーできませんでした。");
    }
  }

  return (
    <main>
      <section className="mt-10">
        <h1 className="text-4xl font-bold text-center">Google Drive URL Converter</h1>
        <h2 className="text-2xl font-bold text-center mt-3">Googleドライブの共有URLを直リンクに変換してくれる君</h2>
      </section>
      <section className="w-4/5 max-w-5xl mx-auto my-8">
        <div className="flex gap-5 items-center">
          <label htmlFor="from" className="w-56 text-right">元のURL</label>
          <input id="from" className="rounded-sm p-2 w-full flex-1 text-slate-950" ref={fromURL} placeholder="https://drive.google.com/file/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/view?usp=drive_link" />
        </div>
        <div className="flex gap-5 mt-10 justify-center">
          <button
            className="text-rose-900 font-bold bg-rose-100 hover:bg-rose-200 active:bg-rose-400
            transition-all px-3 py-2 rounded-md border border-rose-500 flex gap-2 items-center" onClick={handler}>
            <FluentConvertRange24Regular />
            変換！
          </button>
        </div>
        <div className="flex gap-5 mt-10 items-center">
          <label htmlFor="to" className="w-56 text-right">変換後のURL</label>
          <input id="to" className="rounded-sm p-2 w-full flex-1 pointer-events-none text-slate-950" ref={toURL} placeholder="https://drive.google.com/uc?id=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <button
            className="min-w-fit text-indigo-900 disabled:text-gray-500 font-bold
            bg-indigo-100 disabled:bg-gray-300 hover:bg-indigo-200 disabled:hover:bg-gray-300
            active:bg-indigo-400 disabled:cursor-not-allowed transition-all
            px-3 py-2 rounded-md border border-indigo-500 flex gap-2 items-center"
            onClick={copyHandler}
            disabled={disable}>
            <MaterialSymbolsContentCopyOutline /> コピーする！
          </button>
        </div>
      </section>
    </main>
  )
}
