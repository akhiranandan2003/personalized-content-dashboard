"use client";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/store/store";
import type { RootState } from "@/store/store";
const categories=["technology","sports","finance","science","business"];
export default function SettingsPanel(){const dispatch=useDispatch();const selected=useSelector((s:RootState)=>s.preferences.categories);const toggle=(category:string)=>dispatch(setCategories(selected.includes(category)?selected.filter(c=>c!==category):[...selected,category]));return <section className="card p-6"><h2 className="text-xl font-bold">Content preferences</h2><p className="mt-1 text-sm muted">Choose topics that shape your personalized feed.</p><div className="mt-5 flex flex-wrap gap-3">{categories.map(category=><button key={category} onClick={()=>toggle(category)} className="rounded-full border px-4 py-2 text-sm font-semibold" style={{borderColor:selected.includes(category)?"var(--accent)":"var(--border)",background:selected.includes(category)?"var(--border)":"transparent"}}>{category}</button>)}</div></section>;}
