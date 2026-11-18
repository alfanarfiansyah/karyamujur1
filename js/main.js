
// =========================================
// KARYA MUJUR1 - SONGKOK RECCA
// MAIN JAVASCRIPT
// =========================================


// =========================================
// 1. KONFIGURASI WHATSAPP
// =========================================

// GANTI DENGAN NOMOR WHATSAPP TOKO
// Contoh: 6281234567890

const WHATSAPP_NUMBER = "6285382920804";


// Fungsi membuat link WhatsApp

function waUrl(message) {

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

}


// Tahun otomatis di footer

document.getElementById("year").textContent =
    new Date().getFullYear();



// =========================================
// 2. NAVBAR GELEMBUNG MOBILE
// =========================================

const menuToggle = document.getElementById("menuToggle");

const bubbleNav = document.getElementById("bubbleNav");


// Klik tombol menu

menuToggle.addEventListener("click", function () {

    const opened = bubbleNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(opened)
    );

    // Ganti icon menu

    if (opened) {

        menuToggle.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

    } else {

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


// Tutup navbar setelah link diklik

bubbleNav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        bubbleNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});



// =========================================
// 3. WHATSAPP PRODUK
// =========================================


// Pesan WhatsApp umum

const generalMessage =
    "Halo Karya Mujur1 Songkok Recca, saya ingin bertanya tentang produk songkok recca.";


// Tombol WhatsApp utama

const contactWhatsapp =
    document.getElementById("contactWhatsapp");

const floatingWhatsapp =
    document.getElementById("floatingWhatsapp");

contactWhatsapp.href = waUrl(generalMessage);

floatingWhatsapp.href = waUrl(generalMessage);


// Buka WhatsApp di tab baru

contactWhatsapp.target = "_blank";

floatingWhatsapp.target = "_blank";


// Tombol pesan setiap produk

document.querySelectorAll(".order-link").forEach(function (link) {

    const productName = link.dataset.product;

    const message =
        `Halo Karya Mujur1, saya tertarik memesan ${productName}. Mohon info ketersediaan dan detailnya.`;


    link.href = waUrl(message);

    link.target = "_blank";

    link.rel = "noopener";

});



// =========================================
// 4. GALERI LIGHTBOX
// =========================================

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");


// Mengambil semua foto galeri

const galleryImages = [

    ...document.querySelectorAll(".gallery-item")

].map(function (item) {

    return {

        src: item.dataset.image,

        title: item.querySelector("img").alt

    };

});


// Posisi gambar aktif

let currentImage = 0;


// Membuka lightbox

function openLightbox(src, title, list = galleryImages) {

    window.activeLightboxList = list;

    currentImage = Math.max(
        0,
        list.findIndex(function (item) {

            return item.src === src;

        })
    );


    lightboxImage.src = src;

    lightboxCaption.textContent =
        title || list[currentImage]?.title || "";


    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    // Mengunci scroll halaman

    document.body.style.overflow = "hidden";

}


// Ganti gambar

function changeLightbox(step) {

    const list =
        window.activeLightboxList || galleryImages;


    currentImage =
        (currentImage + step + list.length) % list.length;


    lightboxImage.src =
        list[currentImage].src;


    lightboxCaption.textContent =
        list[currentImage].title || "";

}


// Tutup lightbox

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


// Klik foto galeri

document.querySelectorAll(".gallery-item").forEach(function (item) {

    item.addEventListener("click", function () {

        openLightbox(
            item.dataset.image,
            item.querySelector("img").alt
        );

    });

});


// Klik tombol lihat foto produk

document.querySelectorAll(".quick-view").forEach(function (button) {

    button.addEventListener("click", function () {

        const products = [

            ...document.querySelectorAll(".quick-view")

        ].map(function (btn) {

            return {

                src: btn.dataset.image,

                title: btn.dataset.title

            };

        });


        openLightbox(
            button.dataset.image,
            button.dataset.title,
            products
        );

    });

});


// Tombol close

document.getElementById("lightboxClose")
    .addEventListener("click", closeLightbox);


// Tombol previous

document.getElementById("lightboxPrev")
    .addEventListener("click", function () {

        changeLightbox(-1);

    });


// Tombol next

document.getElementById("lightboxNext")
    .addEventListener("click", function () {

        changeLightbox(1);

    });


// Klik area luar gambar untuk menutup

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// Keyboard navigation

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("open")) {

        return;

    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        changeLightbox(-1);

    }


    if (event.key === "ArrowRight") {

        changeLightbox(1);

    }

});



// =========================================
// 5. TESTIMONI OTOMATIS
// =========================================


// Mengambil semua slide

const slides = [

    ...document.querySelectorAll(".testimonial-slide")

];


// Mengambil semua dot

const dots = [

    ...document.querySelectorAll(".dot")

];


// Slide aktif

let activeSlide = 0;


// Timer

let testimonialTimer;


// Fungsi menampilkan testimoni

function showTestimonial(index) {

    activeSlide =
        (index + slides.length) % slides.length;


    // Aktifkan slide

    slides.forEach(function (slide, i) {

        slide.classList.toggle(
            "active",
            i === activeSlide
        );

    });


    // Aktifkan dot

    dots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === activeSlide
        );

    });

}


// Timer otomatis

function restartTestimonialTimer() {

    clearInterval(testimonialTimer);


    testimonialTimer = setInterval(function () {

        showTestimonial(activeSlide + 1);

    }, 5000);

}


// Tombol sebelumnya

document.getElementById("prevTestimonial")
    .addEventListener("click", function () {

        showTestimonial(activeSlide - 1);

        restartTestimonialTimer();

    });


// Tombol berikutnya

document.getElementById("nextTestimonial")
    .addEventListener("click", function () {

        showTestimonial(activeSlide + 1);

        restartTestimonialTimer();

    });


// Klik dot

dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showTestimonial(index);

        restartTestimonialTimer();

    });

});


// Jalankan otomatis

restartTestimonialTimer();



// =========================================
// 6. ANIMASI SCROLL REVEAL
// =========================================


// Menggunakan Intersection Observer

const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");


                // Animasi hanya sekali

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.12

    }

);


// Aktifkan animasi pada semua elemen

document.querySelectorAll(".reveal").forEach(function (element) {

    revealObserver.observe(element);

});



// =========================================
// 7. NAVBAR ACTIVE SAAT SCROLL
// =========================================


// Semua section

const sections = [

    ...document.querySelectorAll("main section[id]")

];


// Semua link navbar

const navLinks = [

    ...document.querySelectorAll(".bubble-nav a")

];


// Tombol kembali ke atas

const backTop =
    document.getElementById("backTop");


// Event scroll

window.addEventListener("scroll", function () {

    const marker = window.scrollY + 160;


    // Navigasi aktif

    sections.forEach(function (section) {

        if (

            marker >= section.offsetTop &&

            marker < section.offsetTop + section.offsetHeight

        ) {

            navLinks.forEach(function (link) {

                link.classList.toggle(

                    "active",

                    link.getAttribute("href") ===
                    `#${section.id}`

                );

            });

        }

    });


    // Tombol back to top

    backTop.classList.toggle(

        "show",

        window.scrollY > 500

    );

}, { passive: true });



// =========================================
// 8. BACK TO TOP
// =========================================

backTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



// =========================================
// END JAVASCRIPT
// KARYA MUJUR1 SONGKOK RECCA
// =========================================
