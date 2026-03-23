import img1 from "./images/1024x1024.jpeg?as=webp";
import img2 from "./images/dansing_cat.gif";
import img3 from "./images/fox.svg";
import img4 from "./images/question.png?as=webp";
import img5 from "./images/present.jpg?as=webp";

import "./style.css";

const gallery = document.querySelector(".gallery");
const images = [
    { src: img1, alt: "High-resolution image" },
    { src: img2, alt: "Dancing cat animation" },
    { src: img3, alt: "Fox vector graphic" },
    { src: img4, alt: "Question mark icon" },
    { src: img5, alt: "Present gift" }
];

images.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.classList.add("gallery-item");
    img.loading = "lazy";

    // Add click handler for fullscreen view
    img.addEventListener("click", () => {
        const modal = createModal(src, alt);
        document.body.appendChild(modal);
    });

    gallery.appendChild(img);
});

function createModal(src, alt) {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s;
        cursor: pointer;
    `;

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        animation: zoomIn 0.3s;
    `;

    modal.appendChild(img);
    modal.addEventListener("click", () => modal.remove());

    return modal;
}

// Add dynamic styles for modal animations
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes zoomIn {
        from { transform: scale(0.8); }
        to { transform: scale(1); }
    }
`;
document.head.appendChild(style);