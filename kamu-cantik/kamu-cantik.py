import asyncio
from threading import Lock

lock = Lock()

async def animate_text(text, delay=100):
    with lock:
        for char in text:
            print(char, end='', flush=True)
            await asyncio.sleep(delay / 1000)
        print()

async def sing_lyric(lyric, delay, speed):
    await asyncio.sleep(delay)
    await animate_text(lyric, speed * 1000)

async def sing_song():
    lyrics = [
        ("\nKarna kamu cantik", 0.09),
        ("Kan kuberi segalanya apa yang kupunya", 0.09),
        ("Dan hatimu baik", 0.10),
        ("Sempurnalah duniaku saat kau di sisiku\n", 0.10),
        ("Bukan karna make up di wajahmu", 0.09),
        ("Atau lipstik merah itu", 0.09),
        ("Lembut hati tutur kata", 0.08),
        ("Terciptalah cinta yang kupuja\n", 0.10),
    ]

    delays = [0.3, 3.4, 7.4, 10.5, 14.5, 18.0, 21.9, 24.4]

    tasks = [
        sing_lyric(lyric, delays[index], speed)
        for index, (lyric, speed) in enumerate(lyrics)
    ]

    await asyncio.gather(*tasks)

async def main():
    await sing_song()

if __name__ == "__main__":
    asyncio.run(main())