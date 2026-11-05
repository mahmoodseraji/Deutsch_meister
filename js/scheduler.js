export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function ensureSchedules(word, legacyAlgorithm='sm2'){
 const w={...word,scheduling:{...(word.scheduling||{})}};
 if(!w.scheduling.leitner){w.scheduling.leitner={box:Number(w.box||1),interval:legacyAlgorithm==='leitner'?Number(w.interval||0):0,dueDate:legacyAlgorithm==='leitner'?(w.dueDate||today()):(w.active===false?'9999-12-31':today()),reviewCount:legacyAlgorithm==='leitner'?Number(w.reviewCount||0):0};}
 if(!w.scheduling.sm2){w.scheduling.sm2={repetitions:legacyAlgorithm==='sm2'?Number(w.repetitions||0):0,easeFactor:legacyAlgorithm==='sm2'?Number(w.easeFactor||2.5):2.5,interval:legacyAlgorithm==='sm2'?Number(w.interval||0):0,dueDate:legacyAlgorithm==='sm2'?(w.dueDate||today()):(w.active===false?'9999-12-31':today()),reviewCount:legacyAlgorithm==='sm2'?Number(w.reviewCount||0):0};}
 return w;
}
export function schedule(word,rating,algorithm='sm2'){
 const w=ensureSchedules(word,algorithm),s={...w.scheduling[algorithm]};
 if(algorithm==='leitner'){const box=Math.max(1,Math.min(5,Number(s.box||1)+(rating==='again'?-1:rating==='hard'?0:rating==='good'?1:2)));s.box=box;s.interval=({1:1,2:2,3:4,4:7,5:14})[box];}
 else{let ease=Number(s.easeFactor||2.5),reps=Number(s.repetitions||0),interval=Number(s.interval||0);if(rating==='again'){reps=0;interval=1;ease=Math.max(1.3,ease-.2);}else{if(rating==='hard'){interval=reps===0?1:Math.max(1,Math.round(interval*1.2));ease=Math.max(1.3,ease-.15);}else if(rating==='good'){interval=reps===0?1:reps===1?3:Math.max(1,Math.round(interval*ease));reps++;}else{interval=reps===0?3:Math.max(1,Math.round(interval*ease*1.3));ease+=.15;reps++;}}s.easeFactor=ease;s.repetitions=reps;s.interval=interval;}
 s.dueDate=addDays(s.interval);s.lastReviewed=today();s.reviewCount=(s.reviewCount||0)+1;w.scheduling[algorithm]=s;
 // Compatibility mirrors only the currently selected algorithm; the other schedule remains untouched.
 Object.assign(w,algorithm==='leitner'?{box:s.box,interval:s.interval,dueDate:s.dueDate,lastReviewed:s.lastReviewed,reviewCount:s.reviewCount}:{repetitions:s.repetitions,easeFactor:s.easeFactor,interval:s.interval,dueDate:s.dueDate,lastReviewed:s.lastReviewed,reviewCount:s.reviewCount});
 return w;
}
export const isDue=(w,algorithm='sm2')=>{const s=w.scheduling?.[algorithm];return (s?.dueDate||w.dueDate||today())<=today()};
