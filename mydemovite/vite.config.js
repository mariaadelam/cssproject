import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteStaticCopy } from 'vite-plugin-static-copy';

import ejs from "ejs";
import fs from "fs-extra";

// 1. Compile EJS → HTML

const head = ejs.render(fs.readFileSync("./src/templates/head.html", "utf8"));
const top = ejs.render(fs.readFileSync("./src/templates/topbar.html", "utf8"));
const banner = ejs.render(fs.readFileSync("./src/templates/banner.html", "utf8"));
const header = ejs.render(fs.readFileSync("./src/templates/header.html", "utf8"));
const sec1 = ejs.render(fs.readFileSync("./src/templates/section1.html", "utf8"));
const sec2 = ejs.render(fs.readFileSync("./src/templates/section2.html", "utf8"));
const sec3 = ejs.render(fs.readFileSync("./src/templates/section3.html", "utf8"));
const sec4 = ejs.render(fs.readFileSync("./src/templates/section4.html", "utf8"));
const sec5 = ejs.render(fs.readFileSync("./src/templates/section5.html", "utf8"));
const sec6 = ejs.render(fs.readFileSync("./src/templates/section6.html", "utf8"));
const sec7 = ejs.render(fs.readFileSync("./src/templates/section7.html", "utf8"));
const sec8 = ejs.render(fs.readFileSync("./src/templates/section8.html", "utf8"));
const footer = ejs.render(fs.readFileSync("./src/templates/footer.html", "utf8"));

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: false, // Minify HTML
            template: './index.html',
            inject: {
                data: {
                    head: head,
                    top: top,
                    banner: banner,
                    header: header,
                    sec1: sec1,
                    sec2: sec2,
                    sec3: sec3,
                    sec4: sec4,
                    sec5: sec5,
                    sec6: sec6,
                    sec7: sec7,
                    sec8: sec8,
                    footer: footer,
                },
                tags: [
                    {
                        tag: 'script',
                        attrs: { type: 'module', src: '/src/assets/js/main.js' },
                        injectTo: 'body' //Inject at the end of <body>
                    }
                ],
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: './src/assets/', // Source folder
                    dest: '' // Copy to /dist/ (destination folder)
                }
            ]
        })
    ],
    server: {
        mimeTypes: {
            'css': 'text/css',
            'js': 'application/javascript'
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/scss/style.scss";`,
            },
        },
    },

    build: {
        rollupOptions: {
            preserveEntrySignatures: 'strict', // Keep each file separate
            input: {
                main: 'index.html', // Ensure that Vite includes all files in the HTML
            },
            output: {
                // assetFileNames: "assets/css/[name]-[hash][extname]", // CSS/JS optimization
                // chunkFileNames: "assets/js/[name]-[hash].js",
                // entryFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
                manualChunks: undefined, // disables the automatic chunking behavior for the project
                                        //all files will be bundled into a single file
            },
        },
    }

});