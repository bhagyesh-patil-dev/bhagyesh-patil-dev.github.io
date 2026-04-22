const projects = [
  {
    title: "Bike Portal App",
    media: [
      "assets/bike_app_main.png",
      "assets/bike_img2.png",
      "assets/bike_img3.png",
      "assets/bike_img4.png",
    ],
    description:
      "A complete marketplace app for bike enthusiasts, buyers, and sellers.",
    details: [
      "Implemented a Cart system for quick purchases and checkout flow.",
      "Wishlist functionality to save favorite bikes for future reference.",
      "Compare bikes feature with detailed specifications side-by-side.",
      "Realtime updates for bike availability and notifications using Firebase.",
      "User reviews and ratings to improve engagement and trust.",
      "Optimized images and assets to reduce app size by 25%.",
    ],
    tech: ["Kotlin", "XML", "Firebase Firestore", "Realtime Database", "Glide"],
    github: "",
  },
  {
    title: "Cab Booking App",
    media: [
      "assets/cab_booking_main.png",
    ],
    description:
      "Ride booking system with separate apps for drivers and riders.",
    details: [
      "Designed and developed a cab-booking app with distinct interfaces for riders and drivers.",
      "Live location tracking and routing using Google Maps SDK.",
      "Ride history logs for both drivers and riders.",
      "Implemented real-time tracking, ride status updates, and request handling.",
      "Push notifications for ride requests, cancellations, and confirmations.",
      "Optimized UI using Jetpack Compose for smooth animations and transitions.",
    ],
    tech: [
      "Kotlin",
      "Firebase Firestore",
      "Google Maps SDK",
      "Jetpack Compose",
    ],
    github: "",
  },

];
const container = document.getElementById("projectsContainer");

projects.forEach((p, i) => {
  container.innerHTML += `
    <div class="project-card" onclick="openModal(${i})">
        <div class="project-image">
            <img src="${p.media.find((m) => !m.endsWith(".mp4"))}"/>
        </div>
        <div class="project-content">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <ul>
                ${p.details
                  .slice(0, 2)
                  .map((d) => `<li>${d}</li>`)
                  .join("")}
            </ul>
            <div class="tags">
                ${p.tech.map((t) => `<span class='tag'>${t}</span>`).join("")}
            </div>
            <a href="${p.github}" target="_blank" class="github-btn" onclick="event.stopPropagation()">
                <i class="bi bi-github"></i> GitHub
            </a>
        </div>
    </div>`;
});

let currentMedia = [];
let mediaIndex = 0;

const modal = document.getElementById("projectModal");

const modalImg = document.getElementById("modalImg");
const modalVideo = document.getElementById("modalVideo");

const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDetails = document.getElementById("modalDetails");
const modalTags = document.getElementById("modalTags");
const modalGithub = document.getElementById("modalGithub");

const closeModalBtn = document.getElementById("closeModal");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function showMedia(index) {
  const src = currentMedia[index];
  const isVideo = src.endsWith(".mp4");

  if (isVideo) {
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = src;
  } else {
    modalVideo.style.display = "none";
    modalImg.style.display = "block";
    modalImg.src = src;
  }
}

function openModal(i) {
  const p = projects[i];

  currentMedia = p.media;
  mediaIndex = 0;

  modalTitle.textContent = p.title;
  modalDesc.textContent = p.description;

  modalDetails.innerHTML = p.details.map((d) => `<li>${d}</li>`).join("");
  modalTags.innerHTML = p.tech.map((t) => `<span>${t}</span>`).join("");
  modalGithub.href = p.github;

  showMedia(mediaIndex);

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

function nextMedia() {
  mediaIndex = (mediaIndex + 1) % currentMedia.length;
  showMedia(mediaIndex);
}

function prevMedia() {
  mediaIndex = (mediaIndex - 1 + currentMedia.length) % currentMedia.length;
  showMedia(mediaIndex);
}

nextBtn.onclick = nextMedia;
prevBtn.onclick = prevMedia;
closeModalBtn.onclick = closeModal;

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const hamburger = document.getElementById("hamburger-menu");
const nav = document.getElementById("nav-links");

let scrollY = 0;

hamburger.addEventListener("click", () => {
  if (!nav.classList.contains("active")) {
    scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
  } else {
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }

  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("nav-open");
});
