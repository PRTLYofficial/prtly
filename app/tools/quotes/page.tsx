'use client'
import { useRef, useState } from 'react'
import JSZip from 'jszip'

const SAMPLE_QUOTES = [
  "Don’t place your mistakes on your head; place them under your feet.",
  "Sacrifice good things for great things.",
  "Small steps every day beat zero steps.",
  "Discipline is choosing what you want most over what you want now.",
  "Action cures fear."
]

export default function QuotesTool() {
  const [text, setText] = useState(SAMPLE_QUOTES[0])
  const [brand, setBrand] = useState('#00d1ff')
  const [logo, setLogo] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const r = new FileReader(); r.onload = () => setLogo(r.result as string); r.readAsDataURL(f)
  }
  const randomQuote = () => setText(SAMPLE_QUOTES[Math.floor(Math.random()*SAMPLE_QUOTES.length)])

  const renderPNG = async () => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!
    const W = 1080, H = 1080; c.width = W; c.height = H

    const g = ctx.createLinearGradient(0,0,W,H)
    g.addColorStop(0,'#071125'); g.addColorStop(1,'#0b1f44')
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H)

    ctx.strokeStyle = brand; ctx.lineWidth = 10
    ctx.shadowColor = brand; ctx.shadowBlur = 28
    ctx.strokeRect(40,40,W-80,H-80); ctx.shadowBlur = 0

    ctx.fillStyle = '#c9dcff'; ctx.font = 'bold 40px Inter, system-ui'
    ctx.fillText('PRTLY Daily Motivation', 60, 120)

    ctx.fillStyle = '#eaf2ff'; ctx.font = 'bold 64px Inter, system-ui'
    wrap(ctx, text, 100, 420, W-200, 80)

    if (logo){
      const img = new Image(); img.src = logo; await img.decode()
      ctx.globalAlpha = .95; const size = 180
      ctx.drawImage(img, W - size - 60, H - size - 60, size, size)
      ctx.globalAlpha = 1
    } else {
      ctx.fillStyle = brand; ctx.font = 'bold 44px Inter, system-ui'
      ctx.fillText('Your Logo', W-320, H-60)
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = canvasRef.current!.toDataURL('image/png')
    a.download = 'prtly-quote.png'; a.click()
  }

  async function makeBatch(count=20){
    const zip = new JSZip()
    for (let i=1; i<=count; i++){
      await renderPNG()
      const dataUrl = canvasRef.current!.toDataURL('image/png')
      const base64 = dataUrl.split(',')[1]
      zip.file(`quote-${i}.png`, base64, {base64:true})
      randomQuote()
    }
    const blob = await zip.generateAsync({type:'blob'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `prtly-quotes-${count}.zip`; a.click()
  }

  return (
    <main className=\"min-h-screen px-6 py-10 max-w-5xl mx-auto\">
      <h1 className=\"font-black text-3xl\">Quote Image Generator — Demo</h1>
      <p className=\"opacity-80\">Upload logo → pick color → render → download 1080×1080 PNG. You can also generate a small ZIP.</p>

      <textarea rows={4} value={text} onChange={e=>setText(e.target.value)}
        className=\"w-full mt-3 p-3 rounded-xl bg-[#0b1430] text-white border border-white/10\"/>
      <div className=\"flex gap-3 flex-wrap items-center mt-3\">
        <button onClick={randomQuote} className=\"btn-neon\">Random Quote</button>
        <label className=\"opacity-80\">Brand color: <input type=\"color\" value={brand} onChange={e=>setBrand(e.target.value)} /></label>
        <label className=\"opacity-80\">Logo: <input type=\"file\" accept=\"image/*\" onChange={onLogo} /></label>
        <button onClick={renderPNG} className=\"btn-neon\">Render</button>
        <button onClick={download} className=\"px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5\">Download PNG</button>
        <button onClick={()=>makeBatch(20)} className=\"px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5\">Generate 20 (ZIP)</button>
      </div>

      <canvas ref={canvasRef} className=\"mt-4 w-full rounded-xl border border-white/10\" />
    </main>
  )
}

function wrap(ctx:CanvasRenderingContext2D, text:string, x:number,y:number,max:number,lh:number){
  const words = text.split(' '); let line='', yy=y
  for(const w of words){ const t=line+w+' '; if(ctx.measureText(t).width>max){ctx.fillText(line,x,yy); line=w+' '; yy+=lh}else line=t }
  ctx.fillText(line, x, yy)
}
