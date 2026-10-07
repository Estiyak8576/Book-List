document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // ১. মোবাইল নেভবার ও হ্যামবার্গার মেনু টগল
    // ==========================================
    const menuIcon = document.querySelector("#menu_icon");
    const navbar = document.querySelector(".navbar");
    const navbg = document.querySelector(".nav_bg");

    if (menuIcon && navbar && navbg) {
        // মেনু আইকনে ক্লিক করলে নেভবার ওপেন/ক্লোজ হবে
        menuIcon.addEventListener("click", () => {
            if (menuIcon.classList.contains("fa-bars")) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }

            navbar.classList.toggle("active");
            navbg.classList.toggle("active");
        });

        // ব্যাকগ্রাউন্ড ব্লাড এরিয়াতে ক্লিক করলে মেনু বন্ধ হবে
        navbg.addEventListener("click", () => {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
            navbar.classList.remove("active");
            navbg.classList.remove("active");
        });
    }

    // ==========================================
    // ২. ক্যাটাগরি ফিল্টারিং (URL Hash অনুযায়ী)
    // ==========================================
    const sections = document.querySelectorAll("main section");

    function filterCategory() {
        const hash = window.location.hash; // URL থেকে hash অংশ নেওয়া (যেমন: #poetry)

        if (hash) {
            sections.forEach(section => {
                if ("#" + section.id === hash) {
                    section.style.display = "block"; // নির্দিষ্ট ক্যাটাগরি দেখাবে
                } else {
                    section.style.display = "none";  // বাকি ক্যাটাগরি লুকিয়ে ফেলবে
                }
            });
        } else {
            // URL-এ কোনো hash না থাকলে (বা 'সব বই' ক্লিক করলে) সব সেকশন দেখাবে
            sections.forEach(section => {
                section.style.display = "block";
            });
        }
    }

    // পেজ লোড হলে এবং URL-এর Hash পরিবর্বতন হলে ফিল্টার চালু হবে
    filterCategory();
    window.addEventListener("hashchange", filterCategory);

    // ==========================================
    // ৩. সার্চ ফিচার (লাইভ সার্চ ও ফর্ম সাবমিট)
    // ==========================================
    const searchForm = document.querySelector("#search_form");
    const searchInput = document.querySelector("#search_input");

    function filterBooks() {
        const query = searchInput.value.toLowerCase().trim();
        const bookCards = document.querySelectorAll(".book_card");

        // সার্চ করার সময় আগে সব ক্যাটাগরি সেকশন দৃশ্যমান করা
        sections.forEach(section => section.style.display = "block");

        bookCards.forEach(card => {
            const title = card.querySelector(".book_name")?.textContent.toLowerCase() || "";
            const author = card.querySelector(".author_name")?.textContent.toLowerCase() || "";

            // সার্চের শব্দের সাথে বই বা লেখকের নাম মিললে দেখাবে
            if (title.includes(query) || author.includes(query)) {
                card.style.display = ""; 
            } else {
                card.style.display = "none"; 
            }
        });

        // যদি সার্চ ইনপুট খালি হয়ে যায়, তবে আবার বর্তমান ক্যাটাগরি অনুযায়ী ফিল্টার ফেরত আনবে
        if (query === "") {
            filterCategory();
        }
    }

    // টাইপ করার সাথে সাথেই লাইভ ফিল্টার
    if (searchInput) {
        searchInput.addEventListener("input", filterBooks);
    }

    // ফর্ম সাবমিট হলে পেজ রিলোড আটকাবে
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            filterBooks();
        });
    }

    // ==========================================
    // ৪. বইয়ে ক্লিক করলে 'পড়া হয়েছে' (is-read) টগল
    // ==========================================
    const bookCards = document.querySelectorAll(".book_card");

    bookCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("is-read");
        });
    });
});