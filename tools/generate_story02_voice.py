import asyncio
import os
import edge_tts

SCENES = [
    {
        "id": 1,
        "text": "अगर चोट सिर्फ एक बार लगी थी, तो उसका दर्द मन में सौ बार क्यों दोहराते हो?",
    },
    {
        "id": 2,
        "text": "दो भिक्षु जंगल के रास्ते से अपने आश्रम लौट रहे थे। सामने एक उफनती हुई कीचड़ भरी नदी थी।",
    },
    {
        "id": 3,
        "text": "किनारे पर एक युवती खड़ी थी, जो उस तेज़ बहाव को पार करने से डर रही थी।",
    },
    {
        "id": 4,
        "text": "बिना कुछ कहे, बड़े भिक्षु ने उसे अपनी पीठ पर उठाया, नदी पार कराई, और नीचे उतारकर आगे बढ़ गए।",
    },
    {
        "id": 5,
        "text": "घंटों तक दोनों चुपचाप चलते रहे। पर छोटे भिक्षु का मन गुस्से और बेचैनी से उबल रहा था।",
    },
    {
        "id": 6,
        "text": "आखिरकार उसने चिल्लाकर कहा—'हमारे नियमों में स्त्री को छूना मना है, फिर आपने उसे पीठ पर क्यों उठाया?'",
    },
    {
        "id": 7,
        "text": "बड़े भिक्षु मुस्कुराए और बोले—'वत्स, मैंने तो उसे नदी किनारे ही छोड़ दिया था। तुम अब तक उसे अपने सिर पर क्यों उठाए घूम रहे हो?'",
    }
]

async def generate_voice():
    voice = "hi-IN-MadhurNeural"
    rate = "+13%"
    pitch = "+0Hz"
    
    os.makedirs("voice/story_02", exist_ok=True)
    
    for s in SCENES:
        out_f = f"voice/story_02/scene_{s['id']}.mp3"
        print(f"Generating {out_f}...")
        comm = edge_tts.Communicate(s["text"], voice=voice, rate=rate, pitch=pitch)
        await comm.save(out_f)
        print(f"Saved {out_f}")

if __name__ == "__main__":
    asyncio.run(generate_voice())
