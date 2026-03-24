import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

const jobs = [
    {
        name: 'imagemin',
        cwd: path.join(rootDir, 'Webpack', 'imagemin'),
        command: 'npm',
        args: ['run', 'build'],
    },
    {
        name: "sharp",
        cwd: path.join(rootDir, 'Webpack', 'sharp'),
        command: 'npm',
        args: ['run', 'build'],
    },
];

const folderPaths = {
    original: "./Webpack/sharp/src/images/",
    imageminBundle: "./Webpack/imagemin/dist/images/",
    sharpBundle: "./Webpack/sharp/dist/images/",
};

// Run jobs synchronously
function main() {
    const totalStart = Date.now();

    for (const job of jobs) {
        const start = Date.now();

        console.log(`\n=== START: ${job.name} ===`);
        console.log(`CWD: ${job.cwd}`);
        console.log(`CMD: ${job.command} ${job.args.join(' ')}`);

        const result = spawnSync(job.command, job.args, {
            cwd: job.cwd,
            shell: true,
            stdio: 'inherit',
            env: process.env,
        });

        const durationMs = Date.now() - start;

        if (result.status === 0) {
            console.log(`=== DONE: ${job.name} | time: ${(durationMs / 1000).toFixed(2)}s ===`);
        } else {
            console.error(`=== FAILED: ${job.name} | exit code: ${result.status} | time: ${(durationMs / 1000).toFixed(2)}s ===`);
            process.exitCode = 1;
            return;
        }


        const folderKey = job.name === "imagemin" ? "imageminBundle" : "sharpBundle";
        job.results = {
            size: getFolderSize(folderPaths[folderKey]),
            time: durationMs,
        };
    }

    const totalDuration = Date.now() - totalStart;
    console.log(`\n=== SUMMARY ===`);
    console.log(`Total time: ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`Images directory size before optimisation: ${getFolderSize(folderPaths.original)} Bytes:`);
    console.log(`≈ ${(getFolderSize(folderPaths.original) / 1024 / 1024).toFixed(2)} MB`);

    jobs.forEach((job, index) => {
        console.log(`\nJob ${index + 1}: ${job.name}`);
        console.log(`Time: ${(job.results.time / 1000).toFixed(2)}s`);
        console.log(`Optimised images size: ${job.results.size} Bytes`);
        console.log(`≈ ${(job.results.size / 1024 / 1024).toFixed(2)} MB`);
    });
}


function getFolderSize(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;

    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            totalSize += stats.size;
        } else if (stats.isDirectory()) {
            totalSize += getFolderSize(filePath);
        }
    }
    return totalSize;
}

main();