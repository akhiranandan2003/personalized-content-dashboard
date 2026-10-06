"use client";
import { useEffect,useMemo,useState } from "react";
import { Reorder } from "framer-motion";
import { useDispatch,useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setItems,setLoading,setError,toggleFavorite } from "@/store/store";
import { getMovies,getNews } from "@/lib/api";
import { socialPosts } from "@/lib/mockSocial";
import ContentCard from "./ContentCard";
import SettingsPanel from "./SettingsPanel";

function useDebouncedValue(value:string,delay=350){const[debounced,setDebounced]=useState(value);useEffect(()=>{const id=setTimeout(()=>setDebounced(value),delay);return()=>clearTimeout(id)},[value,delay]);return debounced;}

export default function Dashboard({query,active}:{query:string;active:string}){const dispatch=useDispatch();const{items,loading,error}=useSelector((s:RootState)=>s.content);const categories=useSelector((s:RootState)=>s.preferences.categories);const favorites=useSelector((s:RootState)=>s.favorites);const[page,setPage]=useState(1);const debouncedQuery=useDebouncedValue(query);
useEffect(()=>{try{const saved=localStorage.getItem("pulse-preferences");if(saved)dispatch({type:"preferences/setCategories",payload:JSON.parse(saved)})}catch{}},[dispatch]);
useEffect(()=>{localStorage.setItem("pulse-preferences",JSON.stringify(categories))},[categories]);
useEffect(()=>{let alive=true;async function load(){dispatch(setLoading(true));try{const[news,movies]=await Promise.all([getNews(categories),getMovies()]);if(alive)dispatch(setItems([...news,...movies,...socialPosts]))}catch(e){if(alive)dispatch(setError(e instanceof Error?e.message:"Something went wrong"))}finally{if(alive)dispatch(setLoading(false))}}load();return()=>{alive=false}},[categories,dispatch]);
const filtered=useMemo(()=>items.filter(item=>!debouncedQuery||`${item.title} ${item.description} ${item.category}`.toLowerCase().includes(debouncedQuery.toLowerCase())),[items,debouncedQuery]);
const visible=filtered.slice(0,page*6);const displayed=active==="favorites"?favorites:active==="trending"?filtered.slice(0,6):visible;
if(active==="settings")return <SettingsPanel/>;
return <div className="space-y-6"><div><p className="text-sm font-semibold" style={{color:"var(--accent)"}}>PERSONALIZED FOR YOU</p><h1 className="mt-1 text-3xl font-black tracking-tight">{active==="favorites"?"Your favorites":active==="trending"?"Trending now":"Good afternoon 👋"}</h1><p className="mt-2 muted">{debouncedQuery?`Showing results for “${debouncedQuery}”`:"News, recommendations and community posts in one place."}</p></div>{error&&<div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">{error}</div>}{loading?<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[1,2,3,4,5,6].map(i=><div key={i} className="card h-80 animate-pulse"/>)}</div>:displayed.length===0?<div className="card p-12 text-center"><h2 className="text-xl font-bold">Nothing here yet</h2><p className="mt-2 muted">Try another search or add more favorite content.</p></div>:<Reorder.Group axis="y" values={displayed} onReorder={next=>{if(active==="dashboard")dispatch(setItems(next))}} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{displayed.map(item=><Reorder.Item key={item.id} value={item}><ContentCard item={item} favorite={favorites.some(f=>f.id===item.id)} onFavorite={()=>dispatch(toggleFavorite(item))}/></Reorder.Item>)}</Reorder.Group>}{active==="dashboard"&&visible.length<filtered.length&&<button onClick={()=>setPage(p=>p+1)} className="mx-auto block rounded-xl px-5 py-3 font-semibold text-white" style={{background:"var(--accent)"}}>Load more</button>}</div>;}
