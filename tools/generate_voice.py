import asyncio
import os
import edge_tts

SCENES = [
    {
        "id": 1,
        "text": "क्या एक मुट्ठी-भर गिलहरी विशाल समुन्दर पर पत्थर का पुल बना सकती है?",
    },
    {
        "id": 2,
        "text": "रामेश्वरम का किनारा था, जहाँ वानर सेना विशाल पर्वत उठा कर समुन्दर में डाल रही थी।",
    },
    {
        "id": 3,
        "text": "हर तरफ धूल थी, गर्जना थी, और लंका तक पहुँचने की बेचैनी थी।",
    },
    {
        "id": 4,
        "text": "तभी एक नन्ही गिलहरी पानी में भीगती, रेत पर लोटती, और अपने शरीर से दो-दो दाने पुल पर झाड़ आती।",
    },
    {
        "id": 5,
        "text": "एक बलवान वानर ने गुस्से में कहा—'ऐ छोटी! हट रास्ते से, तेरे दो दानों से क्या राम सेतु बनेगा?'",
    },
    {
        "id": 6,
        "text": "तभी श्री राम ने मुस्कुराकर उसे अपनी हथेली पर उठा लिया, और बोले—'सेवा में शक्ति नहीं, श्रद्धा देखी जाती है।'",
    },
    {
        "id": 7,
        "text": "राम जी ने प्रेम से उसकी पीठ पर उँगलियाँ फेरीं, और तीन दिव्य लकीरें बन गईं। अगली बार जब तुम गिलहरी देखो, तो देखना—क्या वो लकीरें तुम्हें दिखती हैं?",
    }
]

async def generate_scene_voice():
    voice = "hi-IN-MadhurNeural"
    rate = "+16%"
    pitch = "+0Hz"
    
    os.makedirs("voice", exist_ok=True)
    
    for scene in SCENES:
        out_file = f"voice/scene_{scene['id']}.mp3"
        print(f"Generating {out_file}...")
        communicate = edge_tts.Communicate(scene["text"], voice=voice, rate=rate, pitch=pitch)
        await communicate.save(out_file)

if __name__ == "__main__":
    asyncio.run(generate_scene_voice())
