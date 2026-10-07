document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector("#menu_icon");
    const navbar = document.querySelector(".navbar");
    const navbg = document.querySelector(".nav_bg");

    if (!menuIcon || !navbar || !navbg) {
        console.error("Navbar elements missing in DOM!");
        return;
    }

    menuIcon.addEventListener("click", () => {
        // মেনু আইকন পরিবর্তন
        if (menuIcon.classList.contains("fa-bars")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }

        // মেনু ও ব্যাকগ্রাউন্ড একটিভ করা
        navbar.classList.toggle("active");
        navbg.classList.toggle("active");
    });

    // ব্যাকগ্রাউন্ডে ক্লিক করলে মেনু বন্ধ হবে
    navbg.addEventListener("click", () => {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        navbar.classList.remove("active");
        navbg.classList.remove("active");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // ... আপনার আগের নেভবার সংক্রান্ত কোড ...

    // --- সার্চ অপশনের জন্য নতুন কোড ---
    const searchForm = document.querySelector("#search_form");
    const searchInput = document.querySelector("#search_input");
    const bookCards = document.querySelectorAll(".book_card");

    function filterBooks() {
        const query = searchInput.value.toLowerCase().trim();

        bookCards.forEach(card => {
            const title = card.querySelector(".book_name")?.textContent.toLowerCase() || "";
            const author = card.querySelector(".author_name")?.textContent.toLowerCase() || "";

            // যদি বইয়ের নাম বা লেখকের সাথে কি-ওয়ার্ড মিলে যায়
            if (title.includes(query) || author.includes(query)) {
                card.style.display = ""; // দেখাবে
            } else {
                card.style.display = "none"; // লুকিয়ে রাখবে
            }
        });
    }

    // টাইপ করার সাথে সাথেই ফিল্টার হওয়ার জন্য (Live Search)
    if (searchInput) {
        searchInput.addEventListener("input", filterBooks);
    }

    // সার্চ ফর্ম সাবমিট হলে পেজ রিলোড না হওয়ার জন্য
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            filterBooks();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const bookCards = document.querySelectorAll('.book_card');

    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-read');
        });
    });
});