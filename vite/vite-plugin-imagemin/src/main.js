// Images
import img1 from "./images/ajax-loader.gif";
import img2 from "./images/background.png";
import img3 from "./images/dbt-logo.svg";
import img4 from "./images/folder_blank.gif";
import img5 from "./images/folder_closed.gif";
import img6 from "./images/folder_closed_empty.gif";
import img7 from "./images/folder_closed_in_use.gif";
import img8 from "./images/folder_open.gif";
import img9 from "./images/folder_open_empty.gif";
import img10 from "./images/folder_open_in_use.gif";
import img11 from "./images/logo.png";
import img12 from "./images/logo-mail.png";
import img13 from "./images/logo-shadow.png";
import img14 from "./images/logo-shadow-new.png";
import img15 from "./images/logo_open_access.png";
import img16 from "./images/menu-arrow.png";
import img17 from "./images/menu-spacer.png";
import img18 from "./images/mycore_logo_small_invert.png";
import img19 from "./images/Urmel_Logo_grau.svg";
import img20 from "./images/validation-error.png";
import img21 from "./images/icons/anchor.png";
import img22 from "./images/icons/link.png";
import img23 from "./images/icons/lng_de.gif";
import img24 from "./images/icons/lng_en.gif";
import img25 from "./images/icons/search.png";
import img26 from "./images/icons/flags/ao.png";
import img27 from "./images/icons/flags/ad.png";
import img28 from "./images/icons/flags/ae.png";
import img29 from "./images/icons/flags/ai.png";
import img30 from "./images/icons/flags/af.png";
import img31 from "./images/icons/flags/al.png";
import img32 from "./images/icons/flags/am.png";
import img33 from "./images/icons/flags/an.png";
import img34 from "./images/icons/flags/aq.png";
import img35 from "./images/icons/flags/ar.png";
import img36 from "./images/icons/flags/as.png";
import img37 from "./images/icons/flags/at.png";
import img38 from "./images/icons/flags/au.png";
import img39 from "./images/icons/flags/aw.png";
import img40 from "./images/icons/flags/ax.png";
import img41 from "./images/icons/flags/az.png";
import img42 from "./images/icons/flags/ba.png";
import img43 from "./images/icons/flags/bb.png";

const gallery = document.querySelector(".gallery");

// Gallery
const images = [
    { src: img1, alt: "ajax-loader" },
    { src: img2, alt: "background" },
    { src: img3, alt: "dbt-logo" },
    { src: img4, alt: "folder-blank" },
    { src: img5, alt: "folder_closed" },
    { src: img6, alt: "folder_closed_empty" },
    { src: img7, alt: "folder-closed_in_use" },
    { src: img8, alt: "folder-open" },
    { src: img9, alt: "folder-open_empty" },
    { src: img10, alt: "folder-open_in_use" },
    { src: img11, alt: "logo" },
    { src: img12, alt: "logo-mail" },
    { src: img13, alt: "logo-shadow" },
    { src: img14, alt: "logo-shadow-new" },
    { src: img15, alt: "logo_open_access" },
    { src: img16, alt: "menu-arrow" },
    { src: img17, alt: "menu-spacer" },
    { src: img18, alt: "mycore_logo_small_invert" },
    { src: img19, alt: "urmel_logo_grau" },
    { src: img20, alt: "validation-error" },
];


const icons = [
    { src: img21, alt: "anchor" },
    { src: img22, alt: "link" },
    { src: img23, alt: "lng_de" },
    { src: img24, alt: "img24" },
    { src: img25, alt: "img25" },
    { src: img26, alt: "img26" },
    { src: img27, alt: "img27" },
    { src: img28, alt: "img28" },
    { src: img29, alt: "img29" },
    { src: img30, alt: "img30" },
    { src: img31, alt: "img31" },
    { src: img32, alt: "img32" },
    { src: img33, alt: "img33" },
    { src: img34, alt: "img34" },
    { src: img35, alt: "img35" },
    { src: img36, alt: "img36" },
    { src: img37, alt: "img37" },
    { src: img38, alt: "img38" },
    { src: img39, alt: "img39" },
    { src: img40, alt: "img40" },
    { src: img41, alt: "img41" },
    { src: img42, alt: "img42" },
    { src: img43, alt: "img43" },
]

// Paint icons
const iconsFragment = document.createDocumentFragment();
icons.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.classList.add("icons");
    img.loading = "lazy";
    img.decoding = "async";
    iconsFragment.appendChild(img);
})

// Paint images
const imagesFragment = document.createDocumentFragment();
images.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.classList.add("images");
    img.loading = "lazy";
    img.decoding = "async";
    imagesFragment.appendChild(img);
});



const imagesContainer = document.createElement("div");
imagesContainer.classList.add("images-container");
imagesContainer.appendChild(imagesFragment);

const iconsContainer = document.createElement("div");
iconsContainer.classList.add("icons-container");
iconsContainer.appendChild(iconsFragment);


gallery.appendChild(iconsContainer);
gallery.appendChild(imagesContainer);

