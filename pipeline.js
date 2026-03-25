import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

const jobs = [
    {
        name: 'ImageMinimizerWebpackPlugin(Imagemin)',
        cwd: path.join(rootDir, 'Webpack', 'imagemin'),
        command: 'npm',
        args: ['run', 'build'],
        bundlePath: "./Webpack/imagemin/dist/",
        bundleImagesPath: "./Webpack/imagemin/dist/images/",
    },
    {
        name: "ImageMinimizerWebpackPlugin(Sharp + SVGO)",
        cwd: path.join(rootDir, 'Webpack', 'sharp'),
        command: 'npm',
        args: ['run', 'build'],
        bundlePath: "./Webpack/sharp/dist/",
        bundleImagesPath: "./Webpack/sharp/dist/images/",
    },
    {
        name: "vite-image-optimizer(Sharp + SVGO)",
        cwd: path.join(rootDir, 'vite', 'vite-image-optimizer'),
        command: 'npm',
        args: ['run', 'build'],
        bundlePath: "./vite/vite-image-optimizer/dist/",
        bundleImagesPath: "./vite/vite-image-optimizer/dist/images/",
    },
    {
        name: "vite-plugin-imagemin",
        cwd: path.join(rootDir, 'vite', 'vite-plugin-imagemin'),
        command: 'npm',
        args: ['run', 'build'],
        bundlePath: "./vite/vite-plugin-imagemin/dist/",
        bundleImagesPath: "./vite/vite-plugin-imagemin/dist/images/",
    },

];

function getFolderSize(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;

    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) totalSize += stats.size;
        else if (stats.isDirectory()) totalSize += getFolderSize(filePath);
    }
    return totalSize;
}

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

        job.results = {
            size: getFolderSize(job.bundlePath),
            imagesSize: getFolderSize(job.bundleImagesPath),
            time: durationMs,
        };
    }
    const totalDuration = Date.now() - totalStart;

    const originalImagesSize = getFolderSize("./Webpack/sharp/src/images/");

    console.log(`\n=== SUMMARY ===`);
    console.log(`Total time: ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`Original images size: ${originalImagesSize} Bytes ≈ ${(originalImagesSize / 1024 / 1024).toFixed(2)} MB`);

    jobs.forEach((job) => {
        console.log(`\n=== ${job.name} ===`);
        console.log(`Time: ${(job.results.time / 1000).toFixed(2)}s`);
        console.log(`Bundle size: ${job.results.size} Bytes ≈ ${(job.results.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Optimised images size: ${job.results.imagesSize} Bytes ≈ ${(job.results.imagesSize / 1024 / 1024).toFixed(2)} MB`);
    });
}

main();