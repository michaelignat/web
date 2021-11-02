let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

const moveBackground = (event) => {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isEven = i % 2 === 0;
    const boolInt = isEven ? -1 : 1;

    shapes[i].style.transform = `translate(${x * boolInt}px, ${
      y * boolInt
    }px) rotate(${x * 5}deg)`;
  }

  const cirlces = document.querySelectorAll(".circle");
  for (let i = 0; i < cirlces.length; i++) {
    const isEven = i % 2 === 0;
    const boolInt = isEven ? -1 : 1;

    cirlces[i].style.transform = `translate(${x * boolInt}px, ${
      y * boolInt
    }px)`;
  }

  const stars = document.querySelectorAll(".star");
  for (let i = 0; i < stars.length; i++) {
    const isEven = i % 2 === 0;
    const boolInt = isEven ? -1 : 1;

    stars[i].style.transform = `translate(${x * boolInt}px, ${
      y * boolInt
    }px) rotate(${x * 2.5}deg)`;
  }
};

const toggleContrast = () => {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
};

const contact = (event) => {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";

  emailjs
    .sendForm(
      "service_64ngrnc",
      "template_3v06p1o",
      event.target,
      "user_ja6MPEtnZL4jzhEw0VrRu"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at michael.ignat13@gmail.com"
      );
    });
};

const toggleModal = () => {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  // Toggle the Modal
  document.body.classList += " modal--open";
};
