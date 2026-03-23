import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;

const jobs = [
    {
        name: 'image-webpack-loader',
        cwd: path.join(rootDir, 'image-webpack-loader'),
        command: 'npm',
        args: ['run', 'build'],
    },
    {
        name: 'image-minimizer-webpack-plugin-imagemin',
        cwd: path.join(rootDir, 'ImageMinimizerWebpackPlugin', 'imagemin'),
        command: 'npm',
        args: ['run', 'build'],
    },
    {
        name: "image-minimizer-webpack-plugin-sharp",
        cwd: path.join(rootDir, 'ImageMinimizerWebpackPlugin', 'sharp'),
        command: 'npm',
        args: ['run', 'build'],
    },
];

function runJob(job) {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        // Logs
        console.log(`\n=== START: ${job.name} ===`);
        console.log(`CWD: ${job.cwd}`);
        console.log(`CMD: ${job.command} ${job.args.join(' ')}`);


        // Run the job
        const child = spawn(job.command, job.args, {
            cwd: job.cwd,
            shell: true,
            stdio: ['inherit', 'pipe', 'pipe'],
            env: process.env,
        });


        // Build logs
        child.stdout.on('data', (data) => {
            process.stdout.write(`[${job.name}] ${data}`);
        });

        // Error logs
        child.stderr.on('data', (data) => {
            process.stderr.write(`[${job.name}][ERR] ${data}`);
        });

        // Handle process exit
        child.on('close', (code) => {
            const durationMs = Date.now() - start;

            if (code === 0) {
                console.log(`=== DONE: ${job.name} | time: ${(durationMs / 1000).toFixed(2)}s ===`);
                resolve();
            } else {
                console.log(`=== FAILED: ${job.name} | exit code: ${code} | time: ${(durationMs / 1000).toFixed(2)}s ===`);
                reject(new Error(`${job.name} failed with exit code ${code}`));
            }
        });
    });
}


// Main function to run all jobs concurrently
async function main() {
    const totalStart = Date.now();

    try {
        for (const job of jobs) {
            await runJob(job);
        }

        const totalDuration = Date.now() - totalStart;
        console.log(`\nAll pipelines finished successfully in ${(totalDuration / 1000).toFixed(2)}s`);
    } catch (error) {
        console.error(`\nPipeline stopped: ${error.message}`);
        process.exitCode = 1;
    }
}

main();