import { setTimeout } from 'timers/promises';
import { Mutex } from 'async-mutex';
import chalk from 'chalk';

const lock = new Mutex();

async function animateText(text, delay = 100, color) {
    const release = await lock.acquire();
    try {
        for (const char of text) {
            process.stdout.write(color(char));
            await setTimeout(delay);
        }
        console.log();
    } finally {
        release();
    }
}

async function singLyric(lyric, delay, speed, color) {
    await setTimeout(delay * 1000);
    await animateText(lyric, speed * 1000, color);
}

async function singSong() {
    const lyrics = [
        ["\nKarna kamu cantik", 0.09],
        ["Kan kuberi segalanya apa yang kupunya", 0.09],
        ["Dan hatimu baik", 0.10],
        ["Sempurnalah duniaku saat kau di sisiku\n", 0.10],
        ["Bukan karna make up di wajahmu", 0.09],
        ["Atau lipstik merah itu", 0.09],
        ["Lembut hati tutur kata", 0.08],
        ["Terciptalah cinta yang kupuja\n", 0.10],
    ];

    const delays = [0.3, 3.4, 7.4, 10.5, 14.5, 18.0, 21.9, 24.4];

    const colors = [chalk.bold.red, chalk.bold.white];

    const promises = lyrics.map(([lyric, speed], index) => 
        singLyric(lyric, delays[index], speed, colors[index % colors.length])
    );

    await Promise.all(promises);
}

(async () => {
    await singSong();
})();